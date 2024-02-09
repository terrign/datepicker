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
    defaultSelectedDate: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
    weekStart: 'Monday',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    weekStart: 'Sunday',
  },
};

export const ContextMenuHandlers: Story = {
  args: {
    theme: 'dark',
    weekStart: 'Sunday',
    calendarConfig: {
      contextMenuOptions: [
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
  },
};

export const AllProps: Story = {
  args: {
    theme: 'dark',
    weekStart: 'Sunday',
    defaultSelectedDate: '2024-02-05',
    minDate: '2024-01-01',
    maxDate: '2024-05-10',
    calendarConfig: {
      disableWeekends: true,
      holidays: ['2024-02-02', '2024-02-05', '2024-02-14'],
    },
    onDateSelect(date) {
      return date;
    },
    onError(error) {
      return error;
    },
  },
};

export const CustomTheme: Story = {
  args: {
    theme: 'light',
    weekStart: 'Sunday',
    customStyles: {
      bgColor: '#52310c',
      fontColor: '#ade94c',
      selectedDayBgColor: '#b872e7',
      selectedDayFontColor: '#dfbfc2',
      disabledDayFontColor: '#9b9c9c',
      contextMenuButtonColor: '#004d99',
      contextMenuButtonHoverBgColor: '#eb7f13332',
      borderColor: '#ff0000',
    },
    calendarConfig: {
      enableTodos: true,
      contextMenuOptions: [
        {
          label: 'Add todo custom',
          onClick: (date: string) => {
            const todo = prompt('Todo to add:', '');
            if (todo) {
              localStorage.setItem(date, todo);
            }
          },
        },
      ],
    },
  },
};

export const Todos: Story = {
  args: {
    theme: 'dark',
    weekStart: 'Sunday',
    calendarConfig: {
      enableTodos: true,
    },
  },
};
