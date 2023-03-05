import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { DetailPageTemp } from '@/components/templates/DetailPageTemp';
import { DetailPageTempProps } from '@/components/templates/DetailPageTemp/interface';
import { SITE_KO_NAME } from '@/common/variables';
import { NO_COVER_IMAGE } from '@/common/variables';
import { useGameApi } from '@/hooks/useGameApi';

// * component
function DetailPage({
  data,
  similarGames = []
}: Omit<DetailPageTempProps, 'recentGames'>) {
  const { name, first_release_date } = data;
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    const localRecentGames = JSON.parse(localStorage.getItem('recentGames'));

    const coverData = data.cover
      ? data.cover
      : {
          image_id: NO_COVER_IMAGE
        };

    const currentGameInfo = {
      id: data.id,
      cover: coverData,
      name: data.name,
      aggregated_rating: data.aggregated_rating
    };

    if (!localRecentGames) {
      localStorage.setItem('recentGames', JSON.stringify([currentGameInfo]));
      setRecentGames([currentGameInfo]);
      return;
    }

    // '최근 본 게임' 에서 현재 게임이 없는 경우
    if (localRecentGames.every((item) => item.id !== currentGameInfo.id)) {
      const oldRecentGames = localRecentGames.filter((item, idx) => idx < 4);
      const newGameInfo = [currentGameInfo, ...oldRecentGames];

      localStorage.setItem('recentGames', JSON.stringify(newGameInfo));
      setRecentGames(newGameInfo);
      return;
    }

    setRecentGames(localRecentGames);
  }, [data]);

  return (
    <>
      <Head>
        <title>
          {`${name} (${new Date(
            first_release_date * 1000
          ).getFullYear()}) | ${SITE_KO_NAME}`}
        </title>
      </Head>
      <DetailPageTemp
        data={data}
        similarGames={similarGames}
        recentGames={recentGames}
      />
    </>
  );
}
export default DetailPage;

export async function getServerSideProps({ params }) {
  const { gameId: id } = params;

  try {
    const data = await useGameApi({
      endPoint: 'games',
      fields: `
			name,
			aggregated_rating,
			summary,
			cover.image_id,
			first_release_date,
			genres.name,
			involved_companies.company.name,
			platforms.name,
			websites.*,
			screenshots.image_id,
			videos.video_id,
      age_ratings.*
      `,
      where: `id = ${id}`,
      sort: ''
    });
    const gameData = data[0];

    const similarGenreIds: string = gameData.genres
      ? gameData.genres.map((item) => item.id).toString()
      : '';

    // 비슷한 게임
    const getGameOption = (genres: string, id: string, limit: number) => {
      return {
        endPoint: 'games',
        fields: `
					name,
					cover.image_id,
					aggregated_rating
				`,
        where: `genres = ${genres} & aggregated_rating != null & id != (${id})`,
        sort: 'aggregated_rating desc',
        limit: limit
      };
    };

    let similarGames =
      ((await useGameApi(
        getGameOption(`[${similarGenreIds}]`, `${gameData.id}`, 5)
      )) as any[]) || [];

    // 비슷한 게임의 갯수가 5개 미만인 경우 게임 추가
    if (!similarGames.length || similarGames.length < 5) {
      const moreLength = similarGames.length ? 5 - similarGames.length : 5;
      const similarGameDataId = similarGames.length
        ? `,${similarGames.map((item) => item.id).toString()}`
        : '';

      const moreOptions = getGameOption(
        `(${similarGenreIds})`,
        `${gameData.id}${similarGameDataId}`,
        moreLength
      );
      similarGames = similarGames.concat(await useGameApi(moreOptions));
    }

    return {
      props: {
        data: gameData,
        similarGames
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
