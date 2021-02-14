import DiscoverPageTemp from './index';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import dummyData from '.storybook/dummyData.json';

export default {
	title: 'component/templates/DiscoverPageTemp',
	component: DiscoverPageTemp,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '탐색 페이지 템플릿 컴포넌트',
	}
}

export function discoverPageTemp() {

	const dummyGames = dummyData.games;
	const dummyGenres = dummyData.genres;

	const gameData = boolean('게임 리스트 데이터', true);
	const gemeLength = (gameData) ? number('게임 수', 30) : 0;

	const data = {
		success: gameData,
		filterGameList: [...Array(gemeLength)].map(item => (
			{
				id: dummyGames.id,
				name: dummyGames.name,
				first_release_date: dummyGames.first_release_date,
				aggregated_rating: dummyGames.aggregated_rating,
				cover: dummyGames.cover
			}
		))
	};

	const genresCheckData = [5, 32];
	const releaseDateData = [2016, 2021];
	const ratingScoreData = [20, 70];
	const sortValueData = ['aggregated_rating', 'desc'];

	const runSearch = (genres, releaseDate, ratingScore, sort) => {
		console.log('장르', genres);
		console.log('배포년도', releaseDate);
		console.log('평점', ratingScore);
		console.log('정렬', sort);
	}

	return (
		<div>
			<DiscoverPageTemp
				data={data}
				genreList={dummyGenres}
				genresCheckData={genresCheckData}
				releaseDateData={releaseDateData}
				ratingScoreData={ratingScoreData}
				sortValueData={sortValueData}
				searchFunc={runSearch}
			/>
		</div>
	)
}

discoverPageTemp.story = {
	name: 'Default',
}








