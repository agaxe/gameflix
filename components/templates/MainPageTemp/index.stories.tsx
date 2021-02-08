import MainPageTemp from './index';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
	title: 'component/templates/MainPageTemp',
	component: MainPageTemp,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '메인 페이지 템플릿 컴포넌트',
	}
}

export function mainPageTemp() {

	const comingSoonData = [...Array(5)].map(item => (
		{
			name: 'overwatch',
			screenshots: [{ image_id: 'qix3yskantk4uj0to7xm' }],
			first_release_date: 1464048000
		}
	))


	const gameListData = [...Array(5)].map(item => (
		{
			cover: { image_id: 'co1rcb' },
			name: 'overwatch',
			aggregated_rating: 80
		}
	))

	const streamListData = [...Array(3)].map(it => (
		{
			game: '게임 타이틀',
			streamers: [...Array(3)].map(item => (
				{
					login: 'nyc_timescape',
					display_name: 'NYC_Timescape',
					title: 'New York City Skyline LIVE',
					profile_image_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/783161cb-2fe2-434d-a1cd-90f6cdeda816-profile_image-70x70.png',
					thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_nyc_timescape-{width}x{height}.jpg',
					viewer_count: 12940
				}
			))
		}
	))

	const gameListState = boolean('GameListData', false);
	const streamListState = boolean('StreamListData', false);

	return (
		<MainPageTemp
			comingSoonData={comingSoonData}
			gameListData={gameListState ? gameListData : []}
			streamListData={streamListState ? streamListData : []}
		/>
	)
}

mainPageTemp.story = {
	name: 'Default',
}








