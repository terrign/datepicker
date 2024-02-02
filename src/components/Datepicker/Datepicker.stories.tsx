import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from '.';
import { PredefinedTheme } from 'context/Theme/types';

const meta = {
  title: 'DatePicker',
  component: DatePicker,

  decorators: (Story) => (
    <div style={{ margin: '10vh auto', width: 300 }}>
      <Story />
    </div>
  ),
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
    weekStart: 'Sunday',
    calendarConfig: {
      disableWeekends: true,
      holidays: ['2024-02-02'],
    },
  },
};
