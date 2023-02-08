const path = require('path');

module.exports = {
  stories: ['../components/**/**/*.stories.@(js|mdx|ts|tsx)'],
  framework: '@storybook/react',
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-docs'
  ],

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../')
    };
    return config;
  }
};
