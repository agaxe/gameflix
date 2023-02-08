import { withKnobs } from '@storybook/addon-knobs';
import { SearchInput } from './index';

export default {
  title: 'component/molecules/SearchInput',
  component: SearchInput,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '검색 input 컴포넌트'
  }
};

export function searchInput() {
  return <SearchInput />;
}

searchInput.story = {
  name: 'Default'
};
