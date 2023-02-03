import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { CheckBox } from './index';

export default {
  title: 'component/atoms/CheckBox',
  component: CheckBox,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'CheckBox 컴포넌트'
  }
};

const onClick = () => {};

export const checkbox = () => {
  return <CheckBox id='checkbox' name='checkbox' onClick={onClick} />;
};

export const label = () => (
  <div>
    <LabelBox>
      <label htmlFor='title-h1'>
        <h1>타이틀</h1>
      </label>
      <CheckBox id='title-h1' name='title-h1' onClick={onClick} />
    </LabelBox>
    <LabelBox>
      <label htmlFor='title-h2'>
        <h2>타이틀</h2>
      </label>
      <CheckBox id='title-h2' name='title-h2' onClick={onClick} />
    </LabelBox>
    <LabelBox>
      <label htmlFor='title-h3'>
        <h3>타이틀</h3>
      </label>
      <CheckBox id='title-h3' name='title-h3' onClick={onClick} />
    </LabelBox>
    <LabelBox>
      <label htmlFor='title-h4'>
        <h4>타이틀</h4>
      </label>
      <CheckBox id='title-h4' name='title-h4' onClick={onClick} />
    </LabelBox>
    <LabelBox>
      <label htmlFor='title-p'>
        <p>타이틀</p>
      </label>
      <CheckBox id='title-p' name='title-p' onClick={onClick} />
    </LabelBox>
  </div>
);

checkbox.story = {
  name: 'Default'
};

const LabelBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  label {
    margin-right: 20px;
  }
`;
