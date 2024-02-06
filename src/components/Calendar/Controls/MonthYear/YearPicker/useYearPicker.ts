import { getDateParts } from '@utils';
import { useApp } from 'context/App';
import { useEffect, useState } from 'react';

const getInitView = (initYear: number) => {
  const initView = [];

  for (let i = initYear; i < initYear + 13; i++) {
    initView.push(i);
  }

  for (let i = initYear - 1; i > initYear - 13; i--) {
    initView.unshift(i);
  }
  return initView;
};

export const useYearPicker = () => {
  const { firstDayOfTheViewMonth } = useApp();
  const { year } = getDateParts(firstDayOfTheViewMonth);
  const [currentView, setCurrentView] = useState<number[]>(getInitView(year));

  const next = () => {
    setCurrentView((prev) => {
      const newView = [];
      const last = prev[prev.length - 1];
      for (let i = last + 1; i < last + 26; i++) {
        newView.push(i);
      }
      return newView;
    });
  };

  const prev = () => {
    setCurrentView((prev) => {
      const newView = [];
      const last = prev[0];
      for (let i = last - 1; i > last - 26; i--) {
        newView.unshift(i);
      }
      return newView;
    });
  };

  useEffect(() => {
    setCurrentView(getInitView(year));
  }, [year]);

  return { currentView, next, prev };
};
