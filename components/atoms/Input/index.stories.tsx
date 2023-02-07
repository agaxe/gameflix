import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { useInput } from '@/hooks/useInput';
import { Input } from './index';

export default {
  title: 'component/atoms/Input',
  component: Input,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'Input 컴포넌트'
  }
};

export const input = () => {
  const [{ name }, InputChange] = useInput({
    name: ''
  });

  const type = text('type', 'text');
  const placeholder = text('placeholder', 'placeholder');
  const onChage = InputChange;

  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChage}
    />
  );
};

input.story = {
  name: 'Default'
};
