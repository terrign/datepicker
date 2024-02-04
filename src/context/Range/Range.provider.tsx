import { RangeContext } from 'context/Range/Range.context';
import { PropsWithChildren, useMemo, useState } from 'react';

export interface RangeProvider extends PropsWithChildren {
  defaultSelectionStart?: string;
  defaultSelectionEnd?: string;
}

export const Range = ({ children, defaultSelectionStart, defaultSelectionEnd }: RangeProvider) => {
  const [selectionStart, setSelectionStart] = useState<string | null>(defaultSelectionStart ?? null);
  const [selectionEnd, setSelectionEnd] = useState<string | null>(defaultSelectionEnd ?? null);

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
