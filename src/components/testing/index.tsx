import { DatePicker } from 'components/Datepicker';
import { RangeProvider } from 'context/Range/Range.provider';

export const TestRangePicker = () => {
  return (
    <RangeProvider>
      <label>
        From
        <DatePicker from />
      </label>

      <label>
        <DatePicker to />
      </label>
    </RangeProvider>
  );
};
