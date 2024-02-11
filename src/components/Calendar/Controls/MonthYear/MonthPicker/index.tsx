import { MONTH_NAMES } from '@constants';
import { getDateParts, toStringDate } from '@utils';
import { DatePartSelectButton, PickerGrid } from 'components/Calendar/Controls/MonthYear/styled';
import { PickerProps } from 'components/Calendar/Controls/MonthYear/types';
import { CalendarModal } from 'components/UI/CalendarModal';
import { ActionType } from 'context/App/types';
import { useApp } from 'hooks/useApp';

export const MonthPicker = ({ closeHandler, open }: PickerProps) => {
  const { dispatch, firstDayOfTheViewMonth } = useApp();
  const { year, day, month } = getDateParts(firstDayOfTheViewMonth);
  const getClickHandler = (monthIndex: number) => {
    return () => {
      const date = new Date(Date.UTC(year, monthIndex, day));
      dispatch({ type: ActionType.SET_VIEW_DATE, payload: toStringDate(date) });
      closeHandler();
    };
  };
  return (
    <CalendarModal open={open} onClose={closeHandler}>
      <PickerGrid $cols={2}>
        {MONTH_NAMES.map((monthName, monthIndex) => {
          const onClick = getClickHandler(monthIndex);
          return (
            <DatePartSelectButton key={monthName} onClick={onClick} disabled={month - 1 === monthIndex}>
              {monthName}
            </DatePartSelectButton>
          );
        })}
      </PickerGrid>
    </CalendarModal>
  );
};
