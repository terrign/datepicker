import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from '.';

const meta = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    num: { control: 'number' },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    num: 10,
  },
};
