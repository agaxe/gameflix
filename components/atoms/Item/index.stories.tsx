import React from 'react';
import Item from './index';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
	title: 'component/atoms/Item',
	component: Item,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: 'Item 컴포넌트',
	}
};

export function item() {
	const children = text('children', '리스트 아이템')
	return (
		<Item>{children}</Item>
	)
}

item.story = {
	name: 'Default'
}








