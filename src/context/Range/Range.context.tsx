import { RangeContextType } from '@context/Range/types';
import { createContext } from 'react';

export const initialValues: RangeContextType = {
  selectionStart: null,
  selectionEnd: null,
};

export const RangeContext = createContext(initialValues);
