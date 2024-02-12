import { MAX_YEAR, MIN_YEAR } from '@constants';
import { useApp } from '@hooks/useApp';
import { getDateParts } from '@utils';
import { useEffect, useState } from 'react';

const YEARS_TO_DISPLAY = 25;

const YEARS_TO_APPEND = (YEARS_TO_DISPLAY - 1) / 2;

const getInitYearView = (initYear: number) => {
  const initYearView = [initYear];

  for (let i = 1; i <= YEARS_TO_APPEND; i++) {
    const nextYear = initYear + i;
    const prevYear = initYear - i;

    if (nextYear <= MAX_YEAR) {
      initYearView.push(initYear + i);
    }

    if (prevYear >= MIN_YEAR) {
      initYearView.unshift(initYear - i);
    }
  }

  return initYearView;
};

export const useYearPicker = () => {
  const { firstDayOfTheViewMonth } = useApp();
  const { year } = getDateParts(firstDayOfTheViewMonth);
  const [currentView, setCurrentView] = useState<number[]>(getInitYearView(year));
  const [nextViewButtonDisabled, setNextViewButtonDisabled] = useState(false);
  const [prevViewButtonDisabled, setPrevViewButtonDisabled] = useState(false);

  const setNextView = () => {
    setCurrentView((prevView) => {
      const newView = [];
      const currentLast = prevView[prevView.length - 1];
      for (let year = currentLast + 1; year <= currentLast + YEARS_TO_DISPLAY; year++) {
        if (year <= MAX_YEAR) {
          newView.push(year);
        }
      }
      return newView;
    });
  };

  const setPrevView = () => {
    setCurrentView((prevView) => {
      const newView = [];
      const currentFirst = prevView[0];
      for (let year = currentFirst - 1; year >= currentFirst - YEARS_TO_DISPLAY; year--) {
        if (year >= MIN_YEAR) {
          newView.unshift(year);
        }
      }
      return newView;
    });
  };

  useEffect(() => {
    setPrevViewButtonDisabled(currentView.includes(MIN_YEAR));
    setNextViewButtonDisabled(currentView.includes(MAX_YEAR));
  }, [currentView]);

  useEffect(() => {
    setCurrentView(getInitYearView(year));
  }, [year]);

  return { currentView, setNextView, setPrevView, nextViewButtonDisabled, prevViewButtonDisabled };
};
