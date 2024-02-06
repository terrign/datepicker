import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker, DatePickerFrom } from 'components/Datepicker';
import { useEffect, useRef } from 'react';

describe('Datepicker', () => {
  it('Renders with all static props', async () => {
    const { container } = render(<DatePicker />);
    expect(container).toBeInTheDocument();
  });

  it('Exposes ref', async () => {
    let refInput: HTMLInputElement | null = null;
    const TestComp = () => {
      const ref = useRef<HTMLInputElement>(null);
      useEffect(() => {
        if (ref.current) {
          refInput = ref.current;
        }
      }, [ref]);
      return <DatePicker ref={ref} />;
    };
    render(<TestComp />);

    const input = await screen.findByPlaceholderText(/Choose Date/i);

    expect(refInput).toBe(input);
  });

  it('Opens and closes calendar on calendar button click', async () => {
    render(<DatePicker defaultSelectedDate={'2024-01-01'} />);
    const calendarItem = screen.getByText('January');
    const calendarButton = screen.getByTestId('calendarButton');
    expect(calendarItem).not.toBeVisible();
    fireEvent.click(calendarButton);
    expect(calendarItem).toBeVisible();
    fireEvent.click(calendarButton);
    expect(calendarItem).not.toBeVisible();
  });

  it('Closes calendar on Escape press', async () => {
    render(<DatePicker defaultSelectedDate={'2024-01-01'} />);
    const calendarItem = screen.getByText('January');
    const calendarButton = screen.getByTestId('calendarButton');
    expect(calendarItem).not.toBeVisible();
    fireEvent.click(calendarButton);
    expect(calendarItem).toBeVisible();
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(calendarItem).not.toBeVisible();
    fireEvent.click(calendarButton);
    expect(calendarItem).toBeVisible();
    fireEvent.keyDown(document.body, { key: 'Enter' });
    expect(calendarItem).toBeVisible();
  });

  it('Renders without range provider as default datepicker', async () => {
    const { container } = render(<DatePickerFrom />);
    expect(container).toBeInTheDocument();
  });
});
