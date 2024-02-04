import { RangeContext } from 'context/Range/Range.context';
import { useContext } from 'react';

export const useRangePicker = () => useContext(RangeContext);
