import React from 'react';
import { MainPageTemp } from '@/components/templates/MainPageTemp';
import { MainPageTempProps } from '@/components/templates/MainPageTemp/interface';
import { useGameApi } from '@/hooks/useGameApi';
import { useTwitchApi } from '@/hooks/useTwitchApi';

function MainPage({
  comingSoonGames,
  popularGames,
  liveGameStreams = []
}: MainPageTempProps) {
  return (
    <MainPageTemp
      comingSoonGames={comingSoonGames}
      popularGames={popularGames}
      liveGameStreams={liveGameStreams}
    />
  );
}
export default MainPage;

// * getServerSideProps
export async function getServerSideProps() {
  const today = new Date();
  const todayTimeStamp = Math.floor(today.getTime() / 1000);
  const prevMonth = Math.floor(today.setMonth(today.getMonth() - 3) / 1000);

  // ? 인기 게임 리스트
  const popularGames = await useGameApi({
    endPoint: 'games',
    fields: 'name, aggregated_rating, cover.image_id',
    where: `first_release_date >= ${prevMonth} & rating >= 70 & rating <= 90 & aggregated_rating != null`,
    sort: 'rating desc',
    limit: '5'
  });

  // ? 발매 예정 게임
  const comingSoonGames = await useGameApi({
    endPoint: 'games',
    fields: 'name, screenshots.image_id, first_release_date',
    where: `first_release_date > ${todayTimeStamp} & screenshots != null`,
    sort: 'first_release_date asc',
    limit: '5'
  });

  // ? 게임 방송 리스트
  const getStreamsData = async () => {
    const justChattingId = '509658';

    const gameTop3 = await useTwitchApi('games/top?first=5').then((res) =>
      res.data.filter((item, idx) => item.id !== justChattingId && idx <= 3)
    );

    return await Promise.all(
      gameTop3.map(async (game, index) => {
        const streams = await useTwitchApi(
          `streams?game_id=${game.id}&first=3`
        );
        const streamers = await Promise.all(
          streams.data.map(async (stream) => {
            const { thumbnail_url, viewer_count, title } = stream;
            const user = await useTwitchApi(`users?id=${stream['user_id']}`);
            const { id, login, display_name, profile_image_url } = user.data[0];

            return {
              id,
              thumbnail_url,
              viewer_count,
              title,
              login,
              display_name,
              profile_image_url
            };
          })
        );

        return {
          game: game.name,
          num: index,
          streamers
        };
      })
    );
  };

  const liveGameStreams = await getStreamsData();

  return { props: { popularGames, comingSoonGames, liveGameStreams } };
}
