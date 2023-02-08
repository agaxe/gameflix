import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { VAR_COLOR } from '@/static/styles/variable';
import { Gnb } from './index';

const { COLOR_BLACK } = VAR_COLOR;

export default {
  title: 'component/molecules/Gnb',
  component: Gnb,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'Gnb 컴포넌트'
  }
};

export function gnb() {
  return (
    <GnbBox>
      <Gnb />
    </GnbBox>
  );
}

const GnbBox = styled.div`
  background: ${COLOR_BLACK};
  padding: 20px 30px;
  display: inline-block;
`;

gnb.story = {
  name: 'Default'
};
