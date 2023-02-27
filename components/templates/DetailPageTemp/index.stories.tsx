import {DetailPageTemp} from './index';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import dummyData from '.storybook/dummyData.json';

export default {
	title: 'component/templates/DetailPageTemp',
	component: DetailPageTemp,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '상세 페이지 템플릿 컴포넌트',
	}
}

export function detailPageTemp() {

	const dummyGames = dummyData.games;
	const name = text('게임 이름', dummyGames.name)
	const cover = boolean('게임 커버 이미지 (상태)', true)
	const first_release_date_state = boolean('게임 출시일 (상태)', true)
	const aggregated_rating_state = boolean('게임 평점 (상태)', true)
	const aggregated_rating = aggregated_rating_state && number('게임 평점', dummyGames.aggregated_rating)
	const summary_state = boolean('게임 설명 (상태)', true)
	const summary = summary_state && text('게임 설명', dummyGames.summary)
	const involved_companies_state = boolean('게임 제작 회사 (상태)', true);
	const involved_companies_text = involved_companies_state && text('게임 제작 회사 ', dummyGames.involved_companies[0].company.name);
	const involved_companies = [
		{
			company: {
				name: involved_companies_text
			},
		}
	]
	const genres_state = boolean('게임 장르 (상태)', true);
	const platforms_state = boolean('게임 플랫폼 (상태)', true);
	const age_ratings = boolean('게임 등급 (상태)', true);
	const websites = boolean('게임 관련 사이트 (상태)', true);

	const videosMax = 8;
	const screenshotsMax = 5;
	const mediaState = boolean('미디어 컨텐츠', true);
	const videosLength = number(`비디오 수 ( 최대 ${videosMax} )`, videosMax, { min: 0, max: videosMax });
	const screenshotsLength = number(`스크린샷 수 ( 최대 ${screenshotsMax} )`, screenshotsMax, { min: 0, max: screenshotsMax });
	const similarGameState = boolean('비슷한 게임 여부', true);
	const recentGamesDataState = boolean('최근 본 게임 여부', true);

	const mediaFunc = (type: 'videos' | 'screenshots', length) => {
		if (!length) {
			return [];
		} else {

			let maxNum = length;

			if (type === 'videos' && length > videosMax) maxNum = videosMax;
			if (type === 'screenshots' && length > screenshotsMax) maxNum = screenshotsMax;

			return [...Array(maxNum)].map((item, idx) => dummyGames[type][idx])
		}
	}

	const detailData = {
		name,
		cover: cover && dummyGames.cover,
		first_release_date: first_release_date_state && dummyGames.first_release_date,
		aggregated_rating,
		summary,
		involved_companies,
		genres: genres_state && dummyGames.genres,
		platforms: platforms_state && dummyGames.platforms,
		age_ratings: age_ratings && dummyGames.age_ratings,
		websites: websites && dummyGames.websites,
		videos: mediaState ? mediaFunc('videos', videosLength) : [],
		screenshots: mediaState ? mediaFunc('screenshots', screenshotsLength) : []
	}

	const similarGameData = [...Array(5)].map(item => (
		{
			name: dummyGames.name,
			cover: dummyGames.cover,
			aggregated_rating: dummyGames.aggregated_rating,
		}
	))

	const recentGamesData = [...Array(5)].map(item => (
		{
			name: dummyGames.name,
			cover: dummyGames.cover,
			aggregated_rating: dummyGames.aggregated_rating,
		}
	))

	return (
		<div>
			<DetailPageTemp
				detailData={detailData}
				similarGameData={similarGameState ? similarGameData : []}
				recentGamesData={recentGamesDataState ? recentGamesData : []}
			/>
		</div>
	)
}

detailPageTemp.story = {
	name: 'Default',
}