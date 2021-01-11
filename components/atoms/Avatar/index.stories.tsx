import React from 'react';
import Avatar from './index';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
	title: 'component/atoms/Avatar',
	component: Avatar,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: 'Avatar 컴포넌트',
	}
}

export const avatar = () => {
	const img = text('image', 'https://source.unsplash.com/ZHvM3XIOHoE/100x100');
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