import { DateOrString } from '@types';

import {
  DefaultDay,
  DisabledDay,
  Holiday,
  SelectedDay,
  SelectionEndDay,
  SelectionInRangeDay,
  SelectionStartDay,
} from './Day.styled';
import { DayType } from './types';

interface DayProps {
  type: DayType;
  date: DateOrString;
  onClickHandler?: () => void;
  onContextHandler?: () => void;
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

  if (type === DayType.HOLIDAY) {
    return <Holiday>{day}</Holiday>;
  }

  return <DefaultDay>{day}</DefaultDay>;
};
