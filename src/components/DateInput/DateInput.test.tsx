import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker } from 'components/Datepicker';
import { DatePickerInputProps } from 'components/Datepicker/types';
import { FocusEvent, FocusEventHandler } from 'react';

type RenderWithPropsArgs = Partial<
  Pick<DatePickerInputProps, 'onDateSelect' | 'onError'> & {
    onModalClick: (date: string) => void;
  }
>;

describe('DateInput', () => {
  const renderWithProps = ({ onModalClick, onDateSelect, onError }: RenderWithPropsArgs) => {
    return render(
      <DatePicker
        theme="dark"
        weekStart="Sunday"
        customStyles={{ bgColor: '#7c7509' }}
        minDate="2020-10-15"
        maxDate="2025-04-04"
        onDateSelect={onDateSelect}
        defaultSelectedDate="2024-01-04"
        onError={onError}
        calendarConfig={{
          disableWeekends: true,
          holidays: ['2024-01-01', '2024-01-02', '2024-03-06'],
          modalOptions: [
            {
              label: 'TestLabel',
              onClick: onModalClick!,
            },
          ],
        }}
      />,
    );
  };

  it('onDateSelect works', async () => {
    let value: string | null = 'test';
    const onDateSelect = (date: string | null) => (value = date);
    renderWithProps({ onDateSelect });
    const input = screen.getByPlaceholderText(/Choose Date/i);

    fireEvent.change(input, { target: { value: '2024-01-01' } });
    expect(value).toBe('2024-01-01');

    fireEvent.change(input, { target: { value: '2024-01-011' } });
    expect(value).toBe('2024-01-01');

    fireEvent.change(input, { target: { value: '2024-01-32' } });
    expect(value).toBe('2024-01-01');

    fireEvent.change(input, { target: { value: '11/22/2022' } });
    expect(value).toBe('2024-01-01');

    fireEvent.change(input, { target: { value: '1-1-2029' } });
    expect(value).toBe('2024-01-01');

    fireEvent.change(input, { target: { value: '' } });
    expect(value).toBe('');
  });

  it('onError works', async () => {
    let err: Error | null = null;
    const onError = (error: Error) => (err = error);
    renderWithProps({ onError });
    const input = screen.getByPlaceholderText(/Choose Date/i);

    fireEvent.change(input, { target: { value: 'asdaasd' } });
    expect(err).toBeInstanceOf(Error);
  });

  it('Can not set date less then minDate or higher then maxDate', async () => {
    let err: Error | null = null;
    const onError = (error: Error) => (err = error);
    renderWithProps({ onError });
    const input = screen.getByPlaceholderText(/Choose Date/i);

    fireEvent.change(input, { target: { value: '2050-01-01' } });
    expect(err).toBeInstanceOf(Error);

    err = null;
    fireEvent.change(input, { target: { value: '1950-01-01' } });
    expect(err).toBeInstanceOf(Error);
  });

  it('Can not set weekend if it is disabled', async () => {
    let err: Error | null = null;
    const onError = (error: Error) => (err = error);
    renderWithProps({ onError });
    const input = screen.getByPlaceholderText(/Choose Date/i);

    fireEvent.change(input, { target: { value: '2024-02-04' } });
    expect(err).toBeInstanceOf(Error);
  });

  it('Clears date on clear button click', async () => {
    let value: string | null = 'test';
    const onDateSelect = (date: string | null) => (value = date);
    renderWithProps({ onDateSelect });
    const input = screen.getByPlaceholderText(/Choose Date/i);
    const clearButton = screen.getByTestId('clearButton');
    fireEvent.change(input, { target: { value: '2024-01-02' } });
    fireEvent.click(clearButton);
    expect(value).toBe(null);
  });

  it('Opens calendar on calendar button click', async () => {
    let value: string | null = 'test';
    const onDateSelect = (date: string | null) => (value = date);
    renderWithProps({ onDateSelect });
    const input = screen.getByPlaceholderText(/Choose Date/i);
    const clearButton = screen.getByTestId('clearButton');
    fireEvent.change(input, { target: { value: '2024-01-02' } });
    fireEvent.click(clearButton);
    expect(value).toBe(null);
  });

  it('Sets input value to selected date on blur, if entered value is incorrect', async () => {
    render(<DatePicker defaultSelectedDate={'2024-01-01'} />);
    const input = screen.getByPlaceholderText(/Choose Date/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testvalue' } });
    expect(input.value).toBe('testvalue');
    fireEvent.blur(input);
    expect(input.value).toBe('2024-01-01');
  });

  it(`Fires client's onBlur event`, async () => {
    let value: FocusEvent<HTMLInputElement> | null = null;
    const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      value = event;
    };
    render(<DatePicker defaultSelectedDate={'2024-01-01'} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText(/Choose Date/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testvalue' } });
    expect(input.value).toBe('testvalue');
    fireEvent.blur(input);
    expect(value).toBeTruthy();
  });
});
