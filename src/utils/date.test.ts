import {
  changeDate,
  createCalendarMonthView,
  getDateParts,
  getUTCDatefromDateString,
  toStringDate,
  validateDateString,
} from './date';

describe('Date utils tests', () => {
  it('Validate date func trows error on incorrect format', async () => {
    expect(() => validateDateString('asd')).toThrow();
    expect(() => validateDateString('11/11/2022')).toThrow();
    expect(() => validateDateString('1/1/2022')).toThrow();
    expect(() => validateDateString('2024-1-1')).toThrow();
    expect(() => validateDateString('2024-01-1')).toThrow();
    expect(() => validateDateString('1')).toThrow();
    expect(validateDateString('2024-01-01')).toBe('2024-01-01');
  });

  it('getUTCDatefromDateString returns correct values', async () => {
    const date = getUTCDatefromDateString('2024-01-01');
    const parts = [date.getFullYear(), date.getMonth(), date.getDate()];
    expect(date).toBeTruthy();
    expect(parts).toEqual([2024, 0, 1]);
    expect(() => getUTCDatefromDateString('asdasdasd')).toThrow();
    expect(getUTCDatefromDateString(undefined)).toBe(undefined);
  });

  it('toStringDate returns correct values', async () => {
    const date = toStringDate(new Date(NaN));
    expect(date).toBe('');
    const date1 = new Date(Date.UTC(2024, 0, 1));
    expect(toStringDate(date1)).toBe('2024-01-01');
  });

  it('changeDate correctly changes date', async () => {
    const date = '2024-01-01';
    expect(changeDate(date, 'month', -1)).toBe('2023-12-01');
    const date2 = '2023-01-01';
    expect(changeDate(date2, 'year', -1)).toBe('2022-01-01');
    const date3 = '2024-01-01';
    expect(changeDate(date3, 'month', 0)).toBe('2024-01-01');
  });
});

describe('createCalendarMonthView', () => {
  it('Renders 6 weeks', async () => {
    const month = createCalendarMonthView('2024-01-01', 'Sunday');
    expect(month.length).toBe(6);
  });
  it('Each week length is 7', async () => {
    const month = createCalendarMonthView('2024-01-01', 'Sunday');
    expect(month.reduce((acc, a) => acc + a.length, 0)).toBe(42);
  });
  it('Renders correct values based on week start', () => {
    const [w1, w2] = createCalendarMonthView('2023-10-01', 'Sunday');
    expect(w1.map((a) => getDateParts(a.date).day)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(w2.map((a) => getDateParts(a.date).day)).toEqual([8, 9, 10, 11, 12, 13, 14]);

    const [w1_1, w2_2] = createCalendarMonthView('2024-01-01', 'Monday');
    expect(w1_1.map((a) => getDateParts(a.date).day)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(w2_2.map((a) => getDateParts(a.date).day)).toEqual([8, 9, 10, 11, 12, 13, 14]);
  });
});
