import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { VAR_SIZE } from '@/static/styles/variable';
import { SearchList } from './index';
import dummyData from '.storybook/dummyData.json';

const { CONTENT_WIDTH } = VAR_SIZE;

export default {
  title: 'component/organisms/SearchList',
  component: SearchList,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '게임 검색결과 리스트 컴포넌트'
  }
};

const dummyGames = dummyData.games;

const data = [...Array(5)].map((item) => ({
  cover: dummyGames.cover,
  name: dummyGames.name,
  first_release_date: dummyGames.first_release_date
}));

export function searchList() {
  const type = select('type', ['LIST', 'CARD'], 'LIST');
  const result = boolean('hasResult', true);

  return (
    <div style={{ width: CONTENT_WIDTH }}>
      <SearchList data={data} type={type} hasResult={result} />
    </div>
  );
}

searchList.story = {
  name: 'Default'
};

export const ListType = () => (
  <SearchList data={data} type='LIST' hasResult={true} />
);
export const CardType = () => (
  <SearchList data={data} type='CARD' hasResult={true} />
);
export const NotResult = () => (
  <SearchList data={[]} type='LIST' hasResult={false} />
);
