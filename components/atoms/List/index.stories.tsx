import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Item } from '@/components/atoms/Item';
import { List } from './index';

export default {
  title: 'component/atoms/List',
  component: List,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'List 컴포넌트'
  }
};

export function list() {
  const flex = boolean('display:flex', true);
  const align = text('align-items', '');
  const justify = text('justify-content', '');
  const direction = text('flex-direction', '');

  return (
    <List
      flex={flex}
      align={align}
      justify={justify}
      direction={direction}
      css={`
        & > li {
          padding: 0 10px;
        }
      `}
    >
      <Item>리스트 아이템</Item>
      <Item>리스트 아이템</Item>
      <Item>리스트 아이템</Item>
    </List>
  );
}

list.story = {
  name: 'Default'
};
