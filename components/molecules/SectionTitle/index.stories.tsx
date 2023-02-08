import { text, withKnobs } from '@storybook/addon-knobs';
import { SectionTitle } from './index';

export default {
  title: 'component/molecules/SectionTitle',
  component: SectionTitle,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'section 타이틀 컴포넌트'
  }
};

export function sectionTitle() {
  const title = text('title', 'section 타이틀');

  return <SectionTitle title={title} />;
}

sectionTitle.story = {
  name: 'Default'
};
