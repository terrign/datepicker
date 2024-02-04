import { getDateParts, getMonthName } from '@utils';
import { MonthYear } from 'components/Calendar/Controls/styled';
import { Button } from 'components/UI/Button';
import { Flex } from 'components/UI/Flex';
import { DoubleNextIcon, DoublePrevIcon, NextIcon, PrevIcon } from 'components/UI/Icons';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';

export const Controls = () => {
  const { dispatch, firstDayOfTheViewMonth } = useApp();

  const nextYearHandler = () => {
    dispatch({ type: ActionType.CHANGE_YEAR, payload: 1 });
  };

  const prevYearHandler = () => {
    dispatch({ type: ActionType.CHANGE_YEAR, payload: -1 });
  };

  const nextMonthHandler = () => {
    dispatch({ type: ActionType.CHANGE_MONTH, payload: 1 });
  };

  const prevMonthHandler = () => {
    dispatch({ type: ActionType.CHANGE_MONTH, payload: -1 });
  };

  const { year, month } = getDateParts(firstDayOfTheViewMonth);
  return (
    <Flex>
      <Flex>
        <Button onClick={prevYearHandler} $control>
          <DoublePrevIcon />
        </Button>
        <Button onClick={prevMonthHandler} $control>
          <PrevIcon />
        </Button>
      </Flex>
      <MonthYear>
        {getMonthName(month)} {year}
      </MonthYear>
      <Flex>
        <Button onClick={nextMonthHandler} $control>
          <NextIcon />
        </Button>
        <Button onClick={nextYearHandler} $control>
          <DoubleNextIcon />
        </Button>
      </Flex>
    </Flex>
  );
};
