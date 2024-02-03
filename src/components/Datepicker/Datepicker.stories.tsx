import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from '.';

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
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
    maxDate: {
      control: { type: 'text' },
    },
    minDate: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    weekStart: 'Sunday',
    calendarConfig: {
      disableWeekends: true,
      holidays: ['2024-02-02'],
      modalOptions: [
        {
          label: 'Add todo',
          onClick: (date: string) => {
            const todo = prompt('Todo to add:', '');
            if (todo) {
              localStorage.setItem(date, todo);
            }
          },
        },
      ],
    },
    onError(error) {
      console.log(error.message);
    },
  },
};
