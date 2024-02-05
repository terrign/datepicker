import { getDateParts, MONTH_NAMES, toStringDate } from '@utils';
import { MonthPickerGrid } from 'components/Calendar/Controls/MonthYear/MonthPicker/styled';
import { DatePartSelectButton } from 'components/Calendar/Controls/MonthYear/styled';
import { PickerProps } from 'components/Calendar/Controls/MonthYear/types';
import { Modal } from 'components/UI/Modal';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';

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
    <Modal open={open} onClose={closeHandler}>
      <MonthPickerGrid $cols={2}>
        {MONTH_NAMES.map((a, i) => {
          const onClick = getClickHandler(i);
          return (
            <DatePartSelectButton key={a} onClick={onClick} disabled={month - 1 === i}>
              {a}
            </DatePartSelectButton>
          );
        })}
      </MonthPickerGrid>
    </Modal>
  );
};
