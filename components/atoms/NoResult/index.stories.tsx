import React from 'react';
import NoResult from './index';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
	title: 'component/atoms/NoResult',
	component: NoResult,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '결과없음 컴포넌트',
	}
};

export function noResult() {

	const title = text('타이틀', '[타이틀]');

	return <NoResult title={title} />
}

noResult.story = {
	name: 'Default',
}