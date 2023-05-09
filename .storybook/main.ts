import type { StorybookConfig } from '@storybook/angular'
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: false,
    },
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    {
      from: '../src/assets',
      to: '/assets',
    },
  ],
}
export default config
