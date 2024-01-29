import { getMonthName } from '@utils';
import { Button } from 'components/UI/Button';
import { Flex } from 'components/UI/Flex';
import { DoubleNextIcon, DoublePrevIcon, NextIcon, PrevIcon } from 'components/UI/Icons';
import { Paragraph } from 'components/UI/Paragraph';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';

export const Controls = () => {
  const { dispatch, currentDate } = useApp();

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
  return (
    <Flex>
      <Flex>
        <Button onClick={prevYearHandler}>
          <DoublePrevIcon />
        </Button>
        <Button onClick={prevMonthHandler}>
          <PrevIcon />
        </Button>
      </Flex>
      <Paragraph>
        {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
      </Paragraph>
      <Flex>
        <Button onClick={nextMonthHandler}>
          <NextIcon />
        </Button>
        <Button onClick={nextYearHandler}>
          <DoubleNextIcon />
        </Button>
      </Flex>
    </Flex>
  );
};
