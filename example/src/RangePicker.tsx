import { Range, DatePickerFrom, DatePickerTo, DatePickerProps } from '@terrign/datepicker';
import { useState } from 'react';

const commonProps: DatePickerProps = {
  theme: 'light',
  weekStart: 'Monday',
  minDate: '2022-01-01',
  maxDate: '2024-04-04',
  customStyles: {
    bgColor: '#f1f1f1',
    hoverBgColor: '#7de9e3',
  },
  calendarConfig: {
    disableWeekends: true,
    holidays: ['2024-01-01', '2023-12-05'],
  },
};

export const RangePickerTab = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const startDateHandler = (date: string | null) => {
    setStartDate(date);
  };
  const endDateHandler = (date: string | null) => {
    setEndDate(date);
  };

  return (
    <div style={{ margin: '10vh auto' }}>
      <p>Start date: {startDate}</p>
      <p>End date: {endDate}</p>
      <Range defaultSelectionStart={startDate} defaultSelectionEnd={endDate}>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 20 }}>
          <label>
            Start Date
            <DatePickerFrom onDateSelect={startDateHandler} {...commonProps} />
          </label>

          <label>
            End Date <DatePickerTo onDateSelect={endDateHandler} {...commonProps} />
          </label>
        </form>
      </Range>
    </div>
  );
};
