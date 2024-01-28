import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from '.';
import { PredefinedTheme } from 'context/Theme/types';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      options: [PredefinedTheme.LIGHT, PredefinedTheme.DARK],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: PredefinedTheme.LIGHT,
  },
};

export const Dark: Story = {
  args: {
    theme: PredefinedTheme.DARK,
  },
};
