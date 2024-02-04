import { RangeContext } from 'context/Range/Range.context';
import { useContext } from 'react';

export const useRange = () => useContext(RangeContext);
