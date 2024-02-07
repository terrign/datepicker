import { getDateParts, toStringDate } from '@utils';
import { DatePartSelectButton, PickerGrid } from 'components/Calendar/Controls/MonthYear/styled';
import { PickerProps } from 'components/Calendar/Controls/MonthYear/types';
import { Button } from 'components/UI/Button';
import { NextIcon, PrevIcon } from 'components/UI/Icons';
import { Modal } from 'components/UI/Modal';
import { ActionType } from 'context/App/types';
import { useApp } from 'hooks/useApp';
import { useYearPicker } from 'hooks/useYearPicker';

import { StyledControls } from './styled';

export const YearPicker = ({ closeHandler, open }: PickerProps) => {
  const { dispatch, firstDayOfTheViewMonth } = useApp();
  const { year, day, month } = getDateParts(firstDayOfTheViewMonth);
  const { currentView, setNextView, setPrevView } = useYearPicker();

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
        <Button onClick={setPrevView}>
          <PrevIcon />
        </Button>
        <Button onClick={setNextView}>
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
