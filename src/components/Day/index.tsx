import { DayType } from 'components/Day/types';

import {
  DefaultDay,
  DisabledDay,
  SelectedDay,
  SelectionEndDay,
  SelectionInRangeDay,
  SelectionStartDay,
} from './Day.styled';

interface DayProps {
  type: DayType;
  date: Date | string;
}

export const Day = ({ date, type }: DayProps) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const day = dateObj.getDate();

  if (type === DayType.SELECTED) {
    return <SelectedDay>{day}</SelectedDay>;
  }

  if (type === DayType.SELECTION_START) {
    return <SelectionStartDay>{day}</SelectionStartDay>;
  }

  if (type === DayType.SELECTION_END) {
    return <SelectionEndDay>{day}</SelectionEndDay>;
  }

  if (type === DayType.SELECTION_IN_RANGE) {
    return <SelectionInRangeDay>{day}</SelectionInRangeDay>;
  }

  if (type === DayType.DISABLED) {
    return <DisabledDay>{day}</DisabledDay>;
  }

  return <DefaultDay>{day}</DefaultDay>;
};
