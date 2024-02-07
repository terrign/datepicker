import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker } from 'components/Datepicker';
import { DatePickerInputProps } from 'components/Datepicker/types';

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
        defaultSelectedDate="2024-02-06"
        onError={onError}
        calendarConfig={{
          disableWeekends: true,
          holidays: ['2024-01-01', '2024-01-02', '2024-03-06'],
          contextMenuOptions: [
            {
              label: 'TestLabel',
              onClick: onModalClick!,
            },
          ],
        }}
      />,
    );
  };

  let value: string | null = 'test';
  const onDateSelect = (date: string | null) => (value = date);
  const onModalClick = (date: string) => (value = date);

  beforeEach(() => {
    renderWithProps({ onDateSelect, onModalClick });
    const calendarButton = screen.getByTestId('calendarButton');
    fireEvent.click(calendarButton);
  });

  afterEach(() => {
    value = null;
  });

  it('Selects date on day click', async () => {
    const dayButton = screen.getByText(/14/);
    fireEvent.click(dayButton);
    expect(value).toBe('2024-02-14');
    const input = screen.getByPlaceholderText(/Choose Date/i) as HTMLInputElement;
    expect(input.value).toBe('2024-02-14');
  });

  it(`Can't select disabled date`, async () => {
    const dayButton = screen.getByText(/31/);
    fireEvent.click(dayButton);
    expect(value).toBe(null);
  });

  it(`Shows context menu on day click`, async () => {
    const dayButton = screen.getByText(/14/);
    fireEvent.contextMenu(dayButton);
    fireEvent.click(screen.getByText(/TestLabel/));
    expect(value).toBe('2024-02-14');
  });

  it(`Doesn't show context menu on disabled day click`, async () => {
    const dayButton = screen.getByText(/31/i);
    fireEvent.contextMenu(dayButton);
    expect(screen.queryByText(/TestLabel/i)).not.toBeInTheDocument();
  });
});
