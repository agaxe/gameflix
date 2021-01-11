import React from 'react';
import Logo from './index';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
	title: 'component/atoms/Logo',
	component: Logo,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '로고 컴포넌트',
	}
};

export function logo() {
	const link = boolean('link', true);
	return (
		<>
			<Logo link={link} />
		</>

	)
}

logo.story = {
	name: 'Default',
}