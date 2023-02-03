import { VAR_SIZE } from '@/static/styles/variable';
import { withKnobs } from '@storybook/addon-knobs';
import GameList from './index';
import dummyData from '.storybook/dummyData.json';

const { CONTENT_WIDTH } = VAR_SIZE;

export default {
  title: 'component/organisms/GameList',
  component: GameList,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '게임 카드 리스트 컴포넌트'
  }
};

export function gameList() {
  const dummyGames = dummyData.games;

  const data = [...Array(5)].map((item) => ({
    cover: dummyGames.cover,
    name: dummyGames.name,
    aggregated_rating: dummyGames.aggregated_rating
  }));

  return <GameList data={data} css={{ width: `${CONTENT_WIDTH}` }} />;
}

gameList.story = {
  name: 'Default'
};
