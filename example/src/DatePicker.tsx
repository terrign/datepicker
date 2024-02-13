import { DatePicker } from '@terrign/datepicker';
import { useState } from 'react';

export const DatePickerTab = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>('2022-01-01');

  const dateSelectHandler = (date: string | null) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ margin: '10vh auto', width: 400 }}>
      <p>
        <strong>Selected date:</strong> {selectedDate}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="Date">Date</label>

        <DatePicker
          id="Date"
          defaultSelectedDate={selectedDate}
          onDateSelect={dateSelectHandler}
          calendarConfig={{ enableTodos: true }}
        />
      </form>
    </div>
  );
};
