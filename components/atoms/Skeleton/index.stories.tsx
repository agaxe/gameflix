import React from 'react';
import Skeleton from './index';
import { withKnobs, select, number } from '@storybook/addon-knobs';

export default {
	title: 'component/atoms/Skeleton',
	component: Skeleton,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: 'Skeleton 컴포넌트',
	}
};

export function skeleton() {
	const width = number('width', 100);
	const height = number('height', 50);
	const variant = select(
		'variant',
		['text', 'rect', 'circle'],
		'text'
	);

	return (
		<Skeleton
			width={width}
			height={height}
			variant={variant}
		/>
	)
}

skeleton.story = {
	name: 'Default'
}

export const Text = () => (<Skeleton width={100} />)
export const Rect = () => (<Skeleton width={250} height={50} variant='rect' />)
export const Circle = () => (<Skeleton width={50} height={50} variant='circle' />)












