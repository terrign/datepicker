import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerFrom, DatePickerTo } from 'components/Datepicker';
import { Range } from 'context/Range/Range.provider';

const meta = {
  title: 'RangeDatePicker',
  component: () => {
    return (
      <div style={{ display: 'flex', gap: 20 }}>
        <Range defaultSelectionEnd="2024-02-10" defaultSelectionStart="2024-01-01">
          <label>
            From
            <DatePickerFrom />
          </label>
          <label>
            To
            <DatePickerTo />
          </label>
        </Range>
      </div>
    );
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Range>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RangePicker: Story = {};
