import { useContext } from 'react';

import { AppContext } from '../context/App/App.context';

export const useApp = () => useContext(AppContext);
