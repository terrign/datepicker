import { useApp } from '@hooks/useApp';
import { getDateParts, getMonthName } from '@utils';
import { useEffect, useState } from 'react';

import { MonthPicker } from './MonthPicker';
import { MonthYear } from './styled';
import { YearPicker } from './YearPicker';

export const MonthYearControls = () => {
  const { firstDayOfTheViewMonth, calendarVisible } = useApp();
  const { year, month } = getDateParts(firstDayOfTheViewMonth);

  const [showMonths, setShowMonths] = useState<boolean>(false);
  const [showYears, setShowYears] = useState<boolean>(false);

  const monthClickHandler = () => {
    setShowMonths(true);
  };

  const yearClickHandler = () => {
    setShowYears(true);
  };

  const closeHandler = () => {
    setShowMonths(false);
    setShowYears(false);
  };

  useEffect(() => {
    !calendarVisible && closeHandler();
  }, [calendarVisible]);

  return (
    <MonthYear>
      <button onClick={monthClickHandler} type="button">
        {getMonthName(month)}
      </button>{' '}
      <button onClick={yearClickHandler} type="button">
        {year}
      </button>
      <MonthPicker closeHandler={closeHandler} open={showMonths} />
      <YearPicker closeHandler={closeHandler} open={showYears} />
    </MonthYear>
  );
};
