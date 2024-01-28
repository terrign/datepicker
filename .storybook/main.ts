import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          { find: 'assets', replacement: path.resolve(__dirname, '../src/assets') },
          { find: 'components', replacement: path.resolve(__dirname, '../src/components') },
          { find: 'context', replacement: path.resolve(__dirname, '../src/context') },
          { find: '@constants', replacement: path.resolve(__dirname, '../src/constants/index') },
          { find: '@utils', replacement: path.resolve(__dirname, '../src/utils/index') },
          { find: '@css', replacement: path.resolve(__dirname, '../src/css/index') },
          { find: '@types', replacement: path.resolve(__dirname, '../src/types/index') },
        ],
      },
    });
  },
};
export default config;
