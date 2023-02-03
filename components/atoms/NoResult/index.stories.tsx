import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { NoResult } from './index';

export default {
  title: 'component/atoms/NoResult',
  component: NoResult,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '결과없음 컴포넌트'
  }
};

export function noResult() {
  const title = text('타이틀', '[타이틀]');

  return <NoResult title={title} />;
}

noResult.story = {
  name: 'Default'
};
