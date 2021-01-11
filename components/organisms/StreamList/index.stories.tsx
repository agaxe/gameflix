import StreamList from './index';
import { withKnobs } from '@storybook/addon-knobs';

export default {
	title: 'component/organisms/StreamList',
	component: StreamList,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '게임 스트리머 카드 리스트 컴포넌트',
	}
}

export function streamList() {

	const data = [{
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
	}]

	return (
		<StreamList
			data={data}
		/>
	)
}

streamList.story = {
	name: 'Default',
}








