import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Logo } from './index';

export default {
  title: 'component/atoms/Logo',
  component: Logo,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '로고 컴포넌트'
  }
};

export function logo() {
  const link = boolean('link', true);
  return (
    <>
      <Logo isLink={link} />
    </>
  );
}

logo.story = {
  name: 'Default'
};
