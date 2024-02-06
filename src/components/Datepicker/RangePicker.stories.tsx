import type { Meta, StoryObj } from '@storybook/react';

import { TestRangePicker } from 'components/testing';

const meta = {
  title: 'DatePickerTest',
  component: TestRangePicker,

  tags: ['autodocs'],
} satisfies Meta<typeof TestRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
  },
};
