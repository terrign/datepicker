import { DateStringOrNull } from '@types';
import { Dispatch, SetStateAction } from 'react';

export interface RangeContextType {
  selectionStart: DateStringOrNull;
  selectionEnd: DateStringOrNull;
  setSelectionStart?: Dispatch<SetStateAction<DateStringOrNull>>;
  setSelectionEnd?: Dispatch<SetStateAction<DateStringOrNull>>;
}
