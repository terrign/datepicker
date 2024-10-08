import { Button } from '@components/UI/Button';
import { Flex } from '@components/UI/Flex';
import { DoubleNextIcon, DoublePrevIcon, NextIcon, PrevIcon } from '@components/UI/Icons';
import { MAX_YEAR, MIN_YEAR } from '@constants';
import { ActionType } from '@context/App/types';
import { useApp } from '@hooks/useApp';
import { getDateParts } from '@utils';

import { MonthYearControls } from './MonthYear';

export const Controls = () => {
  const { firstDayOfTheViewMonth, getDateChangeHandler } = useApp();

  const { year, month } = getDateParts(firstDayOfTheViewMonth);

  const nextYearHandler = getDateChangeHandler(ActionType.CHANGE_YEAR, 1);

  const prevYearHandler = getDateChangeHandler(ActionType.CHANGE_YEAR, -1);

  const nextMonthHandler = getDateChangeHandler(ActionType.CHANGE_MONTH, 1);

  const prevMonthHandler = getDateChangeHandler(ActionType.CHANGE_MONTH, -1);

  return (
    <Flex>
      <Flex>
        <Button onClick={prevYearHandler} $control disabled={year === MIN_YEAR}>
          <DoublePrevIcon />
        </Button>
        <Button onClick={prevMonthHandler} $control disabled={year === MIN_YEAR && month === 1}>
          <PrevIcon />
        </Button>
      </Flex>
      <MonthYearControls />
      <Flex>
        <Button onClick={nextMonthHandler} $control disabled={year === MAX_YEAR && month === 12}>
          <NextIcon />
        </Button>
        <Button onClick={nextYearHandler} $control disabled={year === MAX_YEAR}>
          <DoubleNextIcon />
        </Button>
      </Flex>
    </Flex>
  );
};
