import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { DetailPageTemp } from 'components/templates';
import { useGameApi } from 'hooks';

// * type
type DetailPageProps = {
	data: any
}

// * component
function DetailPage({ data }: DetailPageProps) {

	const SITE_KO_NAME = process.env.SITE_KO_NAME;
	const NO_COVER_IMAGE = process.env.NO_COVER_IMAGE;
	const { detailData, similarGameData } = data;
	const { name, first_release_date } = detailData;
	const [recentGames, setRecentGames] = useState([]);

	let newGameInfo = [];

	useEffect(() => {
		const localRecentGames = JSON.parse(localStorage.getItem('recentGames'));

		const coverData = detailData.cover
			? detailData.cover
			: {
				image_id: NO_COVER_IMAGE
			}

		const currentGameInfo = {
			id: detailData.id,
			cover: coverData,
			name: detailData.name,
			aggregated_rating: detailData.aggregated_rating
		}

		// 기존 정보가 있을 경우
		if (localRecentGames) {

			const oldRecentGames = localRecentGames.filter((item, idx) => idx < 4);

			if (localRecentGames.every((item => item.id !== currentGameInfo.id))) {

				newGameInfo = newGameInfo.concat(currentGameInfo);
				newGameInfo = newGameInfo.concat(oldRecentGames);

				localStorage.setItem('recentGames', JSON.stringify(newGameInfo))
				setRecentGames(newGameInfo);
			} else {
				setRecentGames(localRecentGames);
			}
		} else {
			localStorage.setItem('recentGames', JSON.stringify([currentGameInfo]))
			setRecentGames([currentGameInfo]);
		}
	}, [detailData])

	return (
		<>
			<Head>
				<title>
					{`${name} (${new Date(first_release_date * 1000).getFullYear()}) | ${SITE_KO_NAME}`}
				</title>
			</Head>
			<DetailPageTemp
				detailData={detailData}
				similarGameData={similarGameData}
				recentGamesData={recentGames}
			/>
		</>
	)
}
export default DetailPage;

// * getServerSideProps
export async function getServerSideProps({ query }) {
	const { id } = query;

	const detailData = await useGameApi({
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
			age_ratings.*,
			websites.*,
			screenshots.image_id,
			videos.video_id`,
		where: `id = ${id}`,
		sort: '',
	});

	const similarGenre = (detailData[0].genres) ? detailData[0].genres.map(item => item.id).toString() : null;

	// 비슷한 게임
	const optionsFunc = (genres, id, limit) => {
		return (
			{
				endPoint: 'games',
				fields: `
					name,
					cover.image_id,
					aggregated_rating
				`,
				where: `genres = ${genres} & aggregated_rating != null & id != (${id})`,
				sort: 'aggregated_rating desc',
				limit: limit
			}
		)
	}

	let similarGameData = (similarGenre) ? await useGameApi(optionsFunc(`[${similarGenre}]`, `${detailData[0].id}`, 5)) : []

	// 비슷한 게임의 갯수가 5개 미만인 경우 게임 추가
	if (!similarGameData.length || similarGameData.length < 5) {

		const moreLength = similarGameData.length ? 5 - similarGameData.length : 5;
		const similarGameDataId = similarGameData.length ? `,${similarGameData.map(item => item.id).toString()}` : '';
		const moreOptions = optionsFunc(`(${similarGenre})`, `${detailData[0].id}${similarGameDataId}`, moreLength);
		similarGameData = similarGameData.concat(await useGameApi(moreOptions));
	}

	return { props: { data: { success: true, detailData: detailData[0], similarGameData } } }
}

