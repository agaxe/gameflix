import { number, withKnobs } from '@storybook/addon-knobs';
import { Pagination } from './index';

export default {
  title: 'component/molecules/Pagination',
  component: Pagination,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '페이지 네이션 컴포넌트'
  }
};

export function PaginationSb() {
  const length = number('length', 5);

  return <Pagination length={length} />;
}

PaginationSb.story = {
  name: 'Default'
};
