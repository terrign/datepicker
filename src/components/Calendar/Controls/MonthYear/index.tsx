import { getDateParts, getMonthName } from '@utils';
import { MonthYear } from 'components/Calendar/Controls/MonthYear/styled';
import { useApp } from 'context/App';
import { useState } from 'react';

import { MonthPicker } from './MonthPicker';
import { YearPicker } from './YearPicker';

export const MonthYearControls = () => {
  const { firstDayOfTheViewMonth } = useApp();
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
  return (
    <MonthYear>
      <button onClick={monthClickHandler}>{getMonthName(month)}</button>{' '}
      <button onClick={yearClickHandler}>{year}</button>
      <MonthPicker closeHandler={closeHandler} open={showMonths} />
      <YearPicker closeHandler={closeHandler} open={showYears} />
    </MonthYear>
  );
};
