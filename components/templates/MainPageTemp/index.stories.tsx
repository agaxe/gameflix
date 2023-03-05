import { boolean, withKnobs } from '@storybook/addon-knobs';
import { MainPageTemp } from './index';
import dummyData from '.storybook/dummyData.json';

export default {
  title: 'component/templates/MainPageTemp',
  component: MainPageTemp,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '메인 페이지 템플릿 컴포넌트'
  }
};

export function mainPageTemp() {
  const dummyGames = dummyData.games;
  const dummyStreamers = dummyData.streamers;

  const comingSoonData = [...Array(5)].map((item) => ({
    name: dummyGames.name,
    screenshots: dummyGames.screenshots,
    first_release_date: dummyGames.first_release_date
  }));

  const gameListData = [...Array(5)].map((item) => ({
    cover: dummyGames.cover,
    name: dummyGames.name,
    aggregated_rating: dummyGames.aggregated_rating
  }));

  const streamListData = [...Array(3)].map((it) => ({
    game: '게임 타이틀',
    streamers: [...Array(3)].map((item) => dummyStreamers)
  }));

  const gameListState = boolean('GameListData', true);
  const streamListState = boolean('StreamListData', true);

  return (
    <MainPageTemp
      comingSoonGames={comingSoonData}
      popularGames={gameListState ? gameListData : []}
      liveGameStreams={streamListState ? streamListData : []}
    />
  );
}

mainPageTemp.story = {
  name: 'Default'
};
