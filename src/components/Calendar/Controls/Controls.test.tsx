import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker } from 'components/Datepicker';

describe('DateInput', () => {
  const renderWithProps = () => {
    return render(<DatePicker defaultSelectedDate="2026-02-01" />);
  };

  beforeEach(() => {
    renderWithProps();
    const calendarButton = screen.getByTestId('calendarButton');
    fireEvent.click(calendarButton);
  });

  it('Renders with correct default date', async () => {
    expect(screen.getByText(/February/i)).toBeVisible();
    expect(screen.getByText(/2026/i)).toBeVisible();
  });

  it('Changes month', async () => {
    const prevMonth = screen.getByText('⟨');
    const nextMonth = screen.getByText('⟩');

    fireEvent.click(prevMonth);
    expect(screen.getByText(/January/i)).toBeVisible();
    fireEvent.click(prevMonth);
    expect(screen.getByText(/December/i)).toBeVisible();
    fireEvent.click(nextMonth);
    expect(screen.getByText(/January/i)).toBeVisible();
    fireEvent.click(nextMonth);
    expect(screen.getByText(/February/i)).toBeVisible();
  });

  it('Changes year', async () => {
    const prevYear = screen.getByText('⟪');
    const nextYear = screen.getByText('⟫');

    fireEvent.click(prevYear);
    expect(screen.getByText(/2025/i)).toBeVisible();
    fireEvent.click(prevYear);
    expect(screen.getByText(/2024/i)).toBeVisible();
    fireEvent.click(nextYear);
    expect(screen.getByText(/2025/i)).toBeVisible();
    fireEvent.click(nextYear);
    expect(screen.getByText(/2026/i)).toBeVisible();
  });

  it('Shows year selection modal, alows to change year', async () => {
    const yearButton = screen.getByText(/2026/i);
    fireEvent.click(yearButton);

    const yearModalButton = screen.getByText(/2030/i);
    fireEvent.click(yearModalButton);

    expect(yearButton).toHaveTextContent('2030');
  });

  it('Shows month selection modal, alows to change year', async () => {
    const monthButton = screen.getByText(/February/i);
    fireEvent.click(monthButton);

    const monthModalButton = screen.getByText(/May/i);
    fireEvent.click(monthModalButton);

    expect(monthButton).toHaveTextContent('May');
  });
});
