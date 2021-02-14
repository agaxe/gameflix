import StreamCard from './index';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import dummyData from '.storybook/dummyData.json';

export default {
	title: 'component/molecules/StreamCard',
	component: StreamCard,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '게임 스트리머 카드 컴포넌트',
	}
};

export function streamCard() {

	const dummyStreamers = dummyData.streamers;

	const id = text('id', dummyStreamers.login);
	const name = text('name', dummyStreamers.display_name);
	const title = text('title', dummyStreamers.title);
	const profileImg = text('profileImg', dummyStreamers.profile_image_url);
	const thumbnail = text('thumbnail', dummyStreamers.thumbnail_url);
	const viewer = number('viewer', dummyStreamers.viewer_count);

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









