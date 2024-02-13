import { DatePickerFrom, DatePickerTo } from '@components/Datepicker';
import { Range } from '@context/Range/Range.provider';
import { fireEvent, render, screen } from '@testing-library/react';

describe('DateInput', () => {
  let startDate: string | null = '2024-01-24';

  let endDate: string | null = '2024-02-08';

  const onStartDateSelect = (date: string | null) => (startDate = date);

  const onEndDateSelect = (date: string | null) => (endDate = date);

  const renderWithProps = (s = startDate, e = endDate) => {
    return render(
      <Range defaultSelectionStart={s} defaultSelectionEnd={e}>
        <DatePickerFrom onDateSelect={onStartDateSelect} data-testid="startDate" />
        <DatePickerTo onDateSelect={onEndDateSelect} data-testid="endDate" />
      </Range>,
    );
  };

  beforeEach(() => {
    renderWithProps();

    const [startButton, endButton] = screen.getAllByTestId('calendarButton');

    fireEvent.click(startButton);

    fireEvent.click(endButton);
  });

  it('Provides default range', () => {
    expect(screen.getByTestId('startDate')).toHaveValue(startDate);

    expect(screen.getByTestId('endDate')).toHaveValue(endDate);
  });

  it('Can change range', () => {
    fireEvent.change(screen.getByTestId('startDate'), { target: { value: '2024-01-02' } });

    fireEvent.change(screen.getByTestId('endDate'), { target: { value: '2024-02-09' } });

    expect(startDate).toBe('2024-01-02');

    expect(endDate).toBe('2024-02-09');
  });

  it(`Can't select start date higher then end date `, () => {
    fireEvent.change(screen.getByTestId('startDate'), { target: { value: '2024-02-09' } });

    expect(startDate).toBe('2024-01-02');
  });

  it(`Can't select end date less then start date `, () => {
    fireEvent.change(screen.getByTestId('endDate'), { target: { value: '2023-07-12' } });

    expect(endDate).toBe('2024-02-09');
  });
});
