import { DatePickerFrom, DatePickerTo } from '@components/Datepicker';
import { DatePickerInputProps } from '@components/Datepicker/types';
import { Range, RangeProviderProps } from '@context/Range/Range.provider';
import type { Meta, StoryObj } from '@storybook/react';

export type RangePickerProps = Omit<DatePickerInputProps, 'defaultSelectedDate' | 'ref'> & RangeProviderProps;

export const RangePickerComponent = ({ defaultSelectionEnd, defaultSelectionStart, ...rest }: RangePickerProps) => {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Range defaultSelectionStart={defaultSelectionStart} defaultSelectionEnd={defaultSelectionEnd}>
        <label style={{ color: 'gray' }}>
          From
          <DatePickerFrom {...rest} />
        </label>
        <label style={{ color: 'gray' }}>
          To
          <DatePickerTo {...rest} />
        </label>
      </Range>
    </div>
  );
};

const meta = {
  title: 'RangeDatePicker',
  component: RangePickerComponent,
  tags: ['autodocs'],
  args: {
    defaultSelectionStart: '2024-01-01',
    defaultSelectionEnd: '2024-01-15',
    theme: 'dark',
    weekStart: 'Sunday',
    calendarConfig: {
      disableWeekends: true,
      holidays: ['2024-01-01', '2024-01-02', '2024-01-17'],
    },
    minDate: '2024-01-01',
    maxDate: '2024-05-10',
  },
  argTypes: {
    weekStart: {
      options: ['Sunday', 'Monday'],
      control: { type: 'radio' },
    },
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
} satisfies Meta<typeof RangePickerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  args: {
    theme: 'light',
  },
};

export const Dark: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    theme: 'dark',
  },
};
