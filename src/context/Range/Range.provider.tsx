import { RangeContext } from '@context/Range/Range.context';
import { DateStringOrNull } from '@types';
import { PropsWithChildren, useMemo, useState } from 'react';

export interface RangeProviderProps extends PropsWithChildren {
  defaultSelectionStart?: DateStringOrNull;
  defaultSelectionEnd?: DateStringOrNull;
}

export const Range = ({ children, defaultSelectionStart = null, defaultSelectionEnd = null }: RangeProviderProps) => {
  const [selectionStart, setSelectionStart] = useState<DateStringOrNull>(defaultSelectionStart);

  const [selectionEnd, setSelectionEnd] = useState<DateStringOrNull>(defaultSelectionEnd);

  const value = useMemo(
    () => ({
      selectionStart,
      selectionEnd,
      setSelectionStart,
      setSelectionEnd,
    }),
    [selectionStart, selectionEnd],
  );

  return <RangeContext.Provider value={value}>{children}</RangeContext.Provider>;
};
