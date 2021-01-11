import React from 'react';
import GameCard from './index';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';

export default {
	title: 'component/molecules/GameCard',
	component: GameCard,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '게임 카드 컴포넌트',
	}
};

export function gameCard() {
	const cover = text('cover', 'co1rcb');
	const name = text('name', 'overwatch');
	const rating = number('rating', 80);
	const skeleton = boolean('skeleton', false);

	return (
		<GameCard
			cover={cover}
			name={name}
			rating={rating}
			skeleton={skeleton}
		/>
	)
}

gameCard.story = {
	name: 'Default',
}





