import React from 'react';
import GameItem from './index';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import dummyData from '.storybook/dummyData.json';

export default {
	title: 'component/molecules/GameItem',
	component: GameItem,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: '게임 리스트 아이템 컴포넌트',
	}
};

export function gameItem() {

	const dummyGames = dummyData.games;

	const id = number('id', dummyGames.id);
	const cover = text('cover', dummyGames.cover.image_id);
	const name = text('name', dummyGames.name);
	const releaseDate = text('releaseDate', '2016');
	const skeleton = boolean('skeleton', false);

	return (
		<GameItem
			id={id}
			cover={cover}
			name={name}
			releaseDate={releaseDate}
			skeleton={skeleton}
		/>
	)
}

gameItem.story = {
	name: 'Default',
}





