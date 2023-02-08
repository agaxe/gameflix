import React from 'react';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { GameCard } from './index';
import dummyData from '.storybook/dummyData.json';

export default {
  title: 'component/molecules/GameCard',
  component: GameCard,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '게임 카드 컴포넌트'
  }
};

export function gameCard() {
  const dummyGames = dummyData.games;

  const cover = text('cover', dummyGames.cover.image_id);
  const name = text('name', dummyGames.name);
  const rating = number('rating', dummyGames.aggregated_rating);
  const skeleton = boolean('skeleton', false);

  return (
    <GameCard cover={cover} name={name} rating={rating} skeleton={skeleton} />
  );
}

gameCard.story = {
  name: 'Default'
};
