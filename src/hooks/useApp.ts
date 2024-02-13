import { AppContext } from '@context/App/App.context';
import { useContext } from 'react';

export const useApp = () => useContext(AppContext);
