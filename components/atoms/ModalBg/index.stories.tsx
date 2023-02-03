import React from 'react';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { ModalBg } from './index';

export default {
  title: 'component/atoms/ModalBg',
  component: ModalBg,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'modal background 컴포넌트'
  }
};

export function modalBg() {
  const state = boolean('state', true);
  const zIndex = number('z-index', 100);
  const display = text('display', 'block');

  return (
    <ModalBgBox>
      <ModalBg state={state} zIndex={zIndex} display={display} />
      <ModalBgText>
        <h4>TextBox css</h4>
        <p>z-index : 150</p>
      </ModalBgText>
    </ModalBgBox>
  );
}

const ModalBgBox = styled.div`
  position: relative;
  height: 500px;
  & > div {
    position: absolute;
  }
`;
const ModalBgText = styled.div`
  h4 {
    margin-bottom: 10px;
  }
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 150;
`;

modalBg.story = {
  name: 'Default'
};
