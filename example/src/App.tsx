import { useState } from 'react';
import { DatePickerTab } from './DatePicker';
import { RangePickerTab } from './RangePicker';

export function App() {
  const [isDateTab, setIsDateTab] = useState(true);
  const btnStyle = { display: 'inline-block', height: 30, marginLeft: 10 };
  return (
    <div style={{ maxWidth: 600, margin: '10vh auto', fontSize: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Datepicker Demo App</h1>
      <div style={{ width: 200, margin: '0 auto' }}>
        <button onClick={() => setIsDateTab(true)} style={btnStyle}>
          Datepicker
        </button>
        <button onClick={() => setIsDateTab(false)} style={btnStyle}>
          RangePicker
        </button>
      </div>
      {isDateTab ? <DatePickerTab /> : <RangePickerTab />}
    </div>
  );
}
