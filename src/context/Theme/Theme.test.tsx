import { render, screen } from '@testing-library/react';
import { DatePicker } from 'components/Datepicker';
import { darkTheme, lightTheme } from 'context/Theme/constants';

describe('Theme provider', () => {
  it('Provides custom theme', async () => {
    render(<DatePicker customStyles={{ bgColor: '#ece030', fontColor: '#ece030' }} />);
    expect(screen.getByPlaceholderText(/Choose date/i)).toHaveStyle('background: #ece030');
    expect(screen.getByPlaceholderText(/Choose date/i)).toHaveStyle('color: #ece030');
  });

  it('Has dark theme', async () => {
    render(<DatePicker theme="dark" />);
    expect(screen.getByPlaceholderText(/Choose date/i)).toHaveStyle(`background: ${darkTheme.bgColor}`);
    expect(screen.getByPlaceholderText(/Choose date/i)).toHaveStyle(`color: ${darkTheme.fontColor}`);
  });

  it('Has light theme', async () => {
    render(<DatePicker theme="light" />);
    expect(screen.getByPlaceholderText(/Choose date/i)).toHaveStyle(`background: ${lightTheme.bgColor}`);
    expect(screen.getByPlaceholderText(/Choose date/i)).toHaveStyle(`color: ${lightTheme.fontColor}`);
  });
});
