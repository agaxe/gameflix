import StreamCard from './index';
import { withKnobs, text, number } from '@storybook/addon-knobs';

export default {
	title: 'component/molecules/StreamCard',
	component: StreamCard,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '게임 스트리머 카드 컴포넌트',
	}
};

export function streamCard() {

	const id = text('id', 'nyc_timescape');
	const name = text('name', 'NYC_Timescape');
	const title = text('title', 'New York City Skyline LIVE');
	const profileImg = text('profileImg', 'https://static-cdn.jtvnw.net/jtv_user_pictures/783161cb-2fe2-434d-a1cd-90f6cdeda816-profile_image-70x70.png');
	const thumbnail = text('thumbnail', 'https://static-cdn.jtvnw.net/previews-ttv/live_user_nyc_timescape-369x208.jpg');
	const viewer = number('viewer', 12940);

	return (
		<StreamCard
			id={id}
			name={name}
			title={title}
			profileImg={profileImg}
			thumbnail={thumbnail}
			viewer={viewer}
		/>
	)
}

streamCard.story = {
	name: 'Default',
}









