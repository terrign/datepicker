import { DatePickerProps } from 'components/Datepicker/types';
import { Dispatch, SetStateAction } from 'react';

export interface RangeContextType {
  selectionStart: string | null;
  selectionEnd: string | null;
  setSelectionStart?: Dispatch<SetStateAction<string | null>>;
  setSelectionEnd?: Dispatch<SetStateAction<string | null>>;
}

export interface RangePickerProviderProps extends DatePickerProps {
  defaultSelectionStart?: string;
  defaultSelectionEnd?: string;
}
