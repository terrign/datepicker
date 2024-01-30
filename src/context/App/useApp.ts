import { useContext } from 'react';

import { AppContext } from './App.context';

export const useApp = () => {
  return useContext(AppContext);
};
