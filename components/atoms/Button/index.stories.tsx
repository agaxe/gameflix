import React from 'react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { pxToRem } from '@/static/styles/common';
import { Button } from './index';

export default {
  title: 'component/atoms/Button',
  component: Button,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '버튼 컴포넌트'
  }
};

export const button = () => {
  const disabled = boolean('disabled', false);
  const label = text('label', 'button');
  const theme = select(
    'theme',
    ['primary', 'secondary', 'tertiary'],
    'primary'
  );

  return (
    <Button disabled={disabled} theme={theme} type='button'>
      {label}
    </Button>
  );
};
button.story = {
  name: 'Default'
};

const ButtonWrap = styled.ul`
  padding-left: 0;
  & li {
    list-style: none;
    margin-bottom: ${pxToRem(32)};
  }
`;

export const Primary = () => <Button theme='primary'>Button</Button>;
export const Secondary = () => <Button theme='secondary'>Button</Button>;
export const Tertiary = () => <Button theme='tertiary'>Button</Button>;

export const Disabled = () => (
  <ButtonWrap>
    <li>
      <Button theme='primary' disabled>
        Button
      </Button>
    </li>
    <li>
      <Button theme='secondary' disabled>
        Button
      </Button>
    </li>
  </ButtonWrap>
);
