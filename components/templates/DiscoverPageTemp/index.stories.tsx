import DiscoverPageTemp from './index';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

export default {
	title: 'component/templates/DiscoverPageTemp',
	component: DiscoverPageTemp,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '탐색 페이지 템플릿 컴포넌트',
	}
}

export function discoverPageTemp() {

	const gameData = boolean('게임 리스트 데이터', false);
	const gemeLength = (gameData) ? number('게임 수', 30) : 0;

	const data = {
		success: gameData,
		filterGameList: [...Array(gemeLength)].map(item => (
			{
				aggregated_rating: 89.0833333333333,
				cover: { image_id: "co1rcb" },
				id: 8173, name: "Overwatch",
				first_release_date: 1464048000
			}
		))
	};

	const genreList = [
		{ id: 2, name: "Point-and-click" },
		{ id: 4, name: "Fighting" },
		{ id: 5, name: "Shooter" },
		{ id: 7, name: "Music" },
		{ id: 8, name: "Platform" },
		{ id: 9, name: "Puzzle" },
		{ id: 10, name: "Racing" },
		{ id: 11, name: "Real Time Strategy (RTS)" },
		{ id: 12, name: "Role-playing (RPG)" },
		{ id: 13, name: "Simulator" },
		{ id: 14, name: "Sport" },
		{ id: 15, name: "Strategy" },
		{ id: 16, name: "Turn-based strategy (TBS)" },
		{ id: 24, name: "Tactical" },
		{ id: 25, name: "Hack and slash/Beat 'em up" },
		{ id: 26, name: "Quiz/Trivia" },
		{ id: 30, name: "Pinball" },
		{ id: 31, name: "Adventure" },
		{ id: 32, name: "Indie" },
		{ id: 33, name: "Arcade" },
		{ id: 34, name: "Visual Novel" },
		{ id: 35, name: "Card & Board Game" },
		{ id: 36, name: "MOBA" },
	];
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
				genreList={genreList}
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








