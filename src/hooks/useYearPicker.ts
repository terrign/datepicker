import { getDateParts } from '@utils';
import { useApp } from 'hooks/useApp';
import { useEffect, useState } from 'react';

const YEARS_TO_DISPLAY = 25;

const YEARS_TO_APPEND = (YEARS_TO_DISPLAY - 1) / 2;

const getInitYearView = (initYear: number) => {
  const initYearView = [initYear];

  for (let i = 1; i <= YEARS_TO_APPEND; i++) {
    initYearView.push(initYear + i);
    initYearView.unshift(initYear - i);
  }

  return initYearView;
};

export const useYearPicker = () => {
  const { firstDayOfTheViewMonth } = useApp();
  const { year } = getDateParts(firstDayOfTheViewMonth);
  const [currentView, setCurrentView] = useState<number[]>(getInitYearView(year));

  const setNextView = () => {
    setCurrentView((prevView) => {
      const newView = [];
      const currentLast = prevView[prevView.length - 1];
      for (let i = currentLast + 1; i <= currentLast + YEARS_TO_DISPLAY; i++) {
        newView.push(i);
      }
      return newView;
    });
  };

  const setPrevView = () => {
    setCurrentView((prevView) => {
      const newView = [];
      const currentFirst = prevView[0];
      for (let i = currentFirst - 1; i >= currentFirst - YEARS_TO_DISPLAY; i--) {
        newView.unshift(i);
      }
      return newView;
    });
  };

  useEffect(() => {
    setCurrentView(getInitYearView(year));
  }, [year]);

  return { currentView, setNextView, setPrevView };
};
