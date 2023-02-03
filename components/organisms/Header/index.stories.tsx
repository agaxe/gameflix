import { VAR_SIZE } from '@/static/styles/variable';
import { withKnobs } from '@storybook/addon-knobs';
import Header from './index';

const { CONTENT_WIDTH } = VAR_SIZE;

export default {
  title: 'component/organisms/Header',
  component: Header,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'header 컴포넌트'
  }
};

export function header() {
  return (
    <div style={{ width: `${CONTENT_WIDTH}` }}>
      <Header
        css={`
          position: relative;
        `}
      />
    </div>
  );
}

header.story = {
  name: 'Default'
};
