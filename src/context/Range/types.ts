import { DateStringOrNull } from '@types';
import { DatePickerProps } from 'components/Datepicker/types';
import { Dispatch, SetStateAction } from 'react';

export interface RangeContextType {
  selectionStart: DateStringOrNull;
  selectionEnd: DateStringOrNull;
  setSelectionStart?: Dispatch<SetStateAction<DateStringOrNull>>;
  setSelectionEnd?: Dispatch<SetStateAction<DateStringOrNull>>;
}

export interface RangePickerProviderProps extends DatePickerProps {
  defaultSelectionStart?: DateStringOrNull;
  defaultSelectionEnd?: DateStringOrNull;
}
