# Datepicker

Simple datepicker library for React.

### Install

<code>npm i @terrign/datepicker</code>
or
<code>yarn add @terrign/datepicker</code>

### Description

Library provides absolutely standalone component, which can be used without any configuration:

- <code>\<DatePicker /></code>

And:

- <code>\<DatePickerFrom /></code>
- <code>\<DatePickerTo /></code>
- <code>\<Range /></code> - provider to bound together <code>\<DatePickerFrom /></code> and <code>\<DatePickerTo /></code>

All three components can be used together to create a date range picker without losing the customization flexibility and styling of each component separately.

### [Storybook](https://develop--65b39056d863915c37e6299e.chromatic.com/)

### Basic Usage

```html

import { DatePicker } from '@terrign/datepicker';
import { useState } from 'react';

export function App() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const dateSelectHandler = (date: string | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <p>Selected date: {selectedDate}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='Date'>Date</label>
        <DatePicker id='Date' defaultSelectedDate={selectedDate} onDateSelect={dateSelectHandler} />
      </form>
    </>
  );
}
```

### Usage With Range

```html

import { Range, DatePickerFrom, DatePickerTo, DatePickerProps } from '@terrign/datepicker';
import { useState } from 'react';

const commonProps: DatePickerProps = {
  theme: 'light',
  weekStart: 'Monday',
  minDate: '2022-01-01',
  maxDate: '2024-01-01',
  customStyles: {
    bgColor: '#f1f1f1',
    hoverBgColor: '#7de9e3',
  },
  calendarConfig: {
    disableWeekends: true,
    holidays: ['2024-01-01', '2023-12-05'],
  },
};

export function App() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const startDateHandler = (date: string | null) => {
    setStartDate(date);
  };
  const endDateHandler = (date: string | null) => {
    setEndDate(date);
  };

  return (
    <>
      <p>Start date: {startDate}</p>
      <p>End date: {endDate}</p>
      /* Do not provide defaultSelectedDate in Datepicker itself, instead use defaultSelectionStart and defaultSelectionEnd Range props */
      <Range defaultSelectionStart={startDate} defaultSelectionEnd={endDate}>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex' }}>
          <label>
            Start Date
            <DatePickerFrom  onDateSelect={startDateHandler} {...commonProps} />
          </label>

          <label>
            End Date <DatePickerTo onDateSelect={endDateHandler} {...commonProps} />
          </label>
        </form>
      </Range>
    </>
  );
}
```

### Props

- #### <code>weekStart: 'Sunday' | 'Monday'</code>

  First day of the week

- #### <code>theme: 'light | 'dark'</code>

  Predefined color set

- #### <code>customStyles</code>
  Object of custom styles. Overrides <code>theme</code> prop. Available options:

<pre><code>
  bgColor: string;
  fontColor: string;
  borderColor: string;
  borderRadius: number;
  hoverBgColor: string;
  hoverTextColor?: string;
  holidayBorderColor: string;

  disabledDayFontColor: string;

  selectedDayBgColor: string;
  selectedDayFontColor: string;

  selectionRangeDayBgColor: string;
  selectionRangeDayFontColor: string;

  selectionRangeStartDayBgColor: string;
  selectionRangeStartDayFontColor: string;

  selectionRangeEndDayBgColor: string;
  selectionRangeEndDayFontColor: string;

  contextMenuButtonColor: string;
  contextMenuButtonHoverBgColor: string;
  contextMenuButtonHoverColor: string;
  contextMenuBg: string;
</code></pre>

- #### <code>onDateSelect: (date: string | null) => void</code>

  Callback to run on date selection in calendar or manual date input

- #### <code>defaultSelectedDate: string</code>

  Default selected date in yyyy-mm-dd format

- #### <code>maxDate?: string</code>

  Maximum date available for selection in yyyy-mm-dd format

- #### <code>minDate?: string</code>

  Minimum date available for selection in yyyy-mm-dd format

- #### calendarConfig

  - #### <code>holidays?: string[]</code>

    An array of dates in yyyy-mm-dd format, which should be marked as holidays

  - #### <code>disableWeekends?: boolean</code>

    Whether to disable weekends

  - #### <code>contextMenuOptions?: { label: string, onClick: (date: string) => void }[] => </code>

    Adds options to context menu, <code>onClick</code> callback will be fired on option click,

  - #### <code>enableTodos?: boolean</code>

    Adds option to right-click context menu to add, see and remove todos. Saves todos in localStorage
