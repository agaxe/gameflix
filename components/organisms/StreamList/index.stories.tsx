import { withKnobs } from '@storybook/addon-knobs';
import { StreamList } from './index';
import dummyData from '.storybook/dummyData.json';

export default {
  title: 'component/organisms/StreamList',
  component: StreamList,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '게임 스트리머 카드 리스트 컴포넌트'
  }
};

export function streamList() {
  const dummyStreamers = dummyData.streamers;

  const data = [
    {
      game: '게임 타이틀',
      streamers: [...Array(3)].map((item) => dummyStreamers)
    }
  ];

  return <StreamList items={data} />;
}

streamList.story = {
  name: 'Default'
};
