// import { DatePickerFrom, DatePickerTo } from 'components/Datepicker';
// import { Range } from 'context/Range/Range.provider';
// import { useRef, useState } from 'react';

// export const TestRangePicker = () => {
//   const [dateFROM, setDateFROM] = useState<string | null>(null);
//   const [dateTO, setDateTO] = useState<string | null>(null);
//   const onSelectTO = (date: string | null) => {
//     setDateTO(date);
//   };
//   const onSelectFROM = (date: string | null) => {
//     setDateFROM(date);
//   };
//   const ref = useRef(null);
//   return (
//     <>
//       {' '}
//       <span>
//         {`FROM: ${dateFROM}`}
//         {'      '}
//         {`TO: ${dateTO}`}
//         <div style={{ display: 'flex', gap: 20 }}>
//           <Range defaultSelectionStart={dateFROM} defaultSelectionEnd={dateTO}>
//             <label htmlFor="from">From</label>
//             <DatePickerFrom
//               id="from"
//               onError={(e) => console.log(e.message)}
//               onChange={(e) => console.log(`FROM:${e.target.value}`)}
//               onDateSelect={onSelectFROM}
//               calendarConfig={{ disableWeekends: true }}
//               ref={ref}
//             />
//             <label htmlFor="to">To</label>
//             <DatePickerTo
//               id="to"
//               onError={(e) => console.log(e.message)}
//               onChange={(e) => console.log(`TO:${e.target.value}`)}
//               onDateSelect={onSelectTO}
//               calendarConfig={{ disableWeekends: true }}
//             />
//           </Range>
//         </div>
//       </span>
//     </>
//   );
// };
