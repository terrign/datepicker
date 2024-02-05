import { getDateParts, toStringDate } from '@utils';
import { DatePartSelectButton, PickerGrid } from 'components/Calendar/Controls/MonthYear/styled';
import { PickerProps } from 'components/Calendar/Controls/MonthYear/types';
import { useYearPicker } from 'components/Calendar/Controls/MonthYear/YearPicker/useYearPicker';
import { Button } from 'components/UI/Button';
import { NextIcon, PrevIcon } from 'components/UI/Icons';
import { Modal } from 'components/UI/Modal';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';

import { StyledControls } from './styled';

export const YearPicker = ({ closeHandler, open }: PickerProps) => {
  const { dispatch, firstDayOfTheViewMonth } = useApp();
  const { year, day, month } = getDateParts(firstDayOfTheViewMonth);
  const { currentView, next, prev } = useYearPicker();

  const getClickHandler = (newYear: number) => {
    return () => {
      const date = new Date(Date.UTC(newYear, month, day));
      dispatch({ type: ActionType.SET_VIEW_DATE, payload: toStringDate(date) });
      closeHandler();
    };
  };

  return (
    <Modal open={open} onClose={closeHandler}>
      <StyledControls>
        <Button onClick={prev}>
          <PrevIcon />
        </Button>
        <Button onClick={next}>
          <NextIcon />
        </Button>
      </StyledControls>
      <PickerGrid $cols={5}>
        {currentView.map((viewYear) => {
          const clickHandler = getClickHandler(viewYear);
          return (
            <DatePartSelectButton key={viewYear} disabled={viewYear === year} onClick={clickHandler}>
              {viewYear}
            </DatePartSelectButton>
          );
        })}
      </PickerGrid>
    </Modal>
  );
};
