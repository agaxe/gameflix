import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { ComponentMeta } from '@storybook/react';
import { Avatar } from './index';
import dummyData from '.storybook/dummyData.json';

export default {
  title: 'component/atoms/Avatar',
  component: Avatar,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'Avatar 컴포넌트'
  }
};

// const Template = (args) => {
//   const img = text('image', dummyData.streamers.profile_image_url);
//   const skeleton = boolean('skeleton', false);

//   <Avatar img={img} skeleton={skeleton} />;
// };

// export const Default = Template.bind({});
// Default.args = {
//   img: dummyData.streamers.profile_image_url,
//   skeleton: false
// };

// export const Skeleton = Template.bind({});
// Skeleton.args = {
//   skeleton: true
// };

export const avatar = () => {
  const img = text('image', dummyData.streamers.profile_image_url);
  const skeleton = boolean('skeleton?', false);

  return <Avatar img={img} skeleton={skeleton} />;
};

avatar.story = {
  name: 'Default'
};

export const Skeleton = () => <Avatar skeleton={true} />;
