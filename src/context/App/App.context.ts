import { getFirstDayOfTheMonth } from '@utils';
import { createContext } from 'react';

import { AppContextType } from './types';

export const initialValues: AppContextType = {
  weekStart: 'Sunday',
  selectionStart: null,
  selectionEnd: null,
  currentDate: getFirstDayOfTheMonth(new Date()),
  dispatch: () => {},
};

export const AppContext = createContext(initialValues);
