import { DatePartSelectButton, PickerGrid } from '@components/Calendar/Controls/MonthYear/styled';
import { PickerProps } from '@components/Calendar/Controls/MonthYear/types';
import { Button } from '@components/UI/Button';
import { CalendarModal } from '@components/UI/CalendarModal';
import { NextIcon, PrevIcon } from '@components/UI/Icons';
import { ActionType } from '@context/App/types';
import { useApp } from '@hooks/useApp';
import { useYearPicker } from '@hooks/useYearPicker';
import { getDateParts, toStringDate } from '@utils';

import { StyledControls } from './styled';

export const YearPicker = ({ closeHandler, open }: PickerProps) => {
  const { dispatch, firstDayOfTheViewMonth } = useApp();
  const { year, day, month } = getDateParts(firstDayOfTheViewMonth);
  const { currentView, setNextView, setPrevView, prevViewButtonDisabled, nextViewButtonDisabled } = useYearPicker();

  const getClickHandler = (newYear: number) => {
    return () => {
      const date = new Date(Date.UTC(newYear, month - 1, day));
      dispatch({ type: ActionType.SET_VIEW_DATE, payload: toStringDate(date) });
      closeHandler();
    };
  };

  return (
    <CalendarModal open={open} onClose={closeHandler}>
      <StyledControls>
        <Button onClick={setPrevView} disabled={prevViewButtonDisabled}>
          <PrevIcon />
        </Button>
        <Button onClick={setNextView} disabled={nextViewButtonDisabled}>
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
    </CalendarModal>
  );
};
