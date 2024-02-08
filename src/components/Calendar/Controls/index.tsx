import { GetDatePartChangeHandlerType } from 'components/Calendar/Controls/types';
import { Button } from 'components/UI/Button';
import { Flex } from 'components/UI/Flex';
import { DoubleNextIcon, DoublePrevIcon, NextIcon, PrevIcon } from 'components/UI/Icons';
import { ActionType } from 'context/App/types';
import { useApp } from 'hooks/useApp';

import { MonthYearControls } from './MonthYear';

export const Controls = () => {
  const { dispatch } = useApp();

  const getDateChangeHandler: GetDatePartChangeHandlerType = (action, changeAmount) => () => {
    dispatch({ type: action, payload: changeAmount });
  };

  const nextYearHandler = getDateChangeHandler(ActionType.CHANGE_YEAR, 1);
  const prevYearHandler = getDateChangeHandler(ActionType.CHANGE_YEAR, -1);
  const nextMonthHandler = getDateChangeHandler(ActionType.CHANGE_MONTH, 1);
  const prevMonthHandler = getDateChangeHandler(ActionType.CHANGE_MONTH, -1);

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
      <MonthYearControls />
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
