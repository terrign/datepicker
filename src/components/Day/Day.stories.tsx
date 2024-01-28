import type { Meta, StoryObj } from '@storybook/react';

import { Day } from '.';
import { CustomThemeProvider } from 'context/Theme/Theme.provider';
import { DayType } from 'components/Day/types';

const meta = {
  title: 'UI/Day',
  component: Day,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <CustomThemeProvider>
        <Story />
      </CustomThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  args: {
    date: new Date(Date.now()),
  },
  argTypes: {
    date: { control: { type: 'date' } },
  },
} satisfies Meta<typeof Day>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: DayType.DEFAULT,
  },
};

export const Selected: Story = {
  args: {
    type: DayType.SELECTED,
  },
};

export const Disabled: Story = {
  args: {
    type: DayType.DISABLED,
  },
};

export const SelectionStart: Story = {
  args: {
    type: DayType.SELECTION_START,
  },
};

export const SelectionEnd: Story = {
  args: {
    type: DayType.SELECTION_END,
  },
};

export const SelectionInRange: Story = {
  args: {
    type: DayType.SELECTION_IN_RANGE,
  },
};
