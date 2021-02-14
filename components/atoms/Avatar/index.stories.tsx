import React from 'react';
import Avatar from './index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import dummyData from '.storybook/dummyData.json';

export default {
	title: 'component/atoms/Avatar',
	component: Avatar,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: 'Avatar 컴포넌트',
	}
}

export const avatar = () => {
	const img = text('image', dummyData.streamers.profile_image_url);
	const skeleton = boolean('skeleton', false);

	return (
		<Avatar
			img={img}
			skeleton={skeleton}
		/>
	)
}

avatar.story = {
	name: 'Default'
}


export const Skeleton = () => <Avatar skeleton={true} />