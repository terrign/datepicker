import { Day, DayProps } from 'components/Calendar/Day';
import { Flex } from 'components/UI/Flex';

export interface DaysOfTheMonthData {
  days: DayProps[][];
  disableWeekends?: boolean;
}

export const Month = ({ days, disableWeekends }: DaysOfTheMonthData) => {
  return (
    <Flex $dir="col">
      {days.map((week) => (
        <Flex key={week[0].date} style={{ width: '100%' }}>
          {week.map(({ date, types }) => {
            return <Day date={date} key={date} types={types} disableWeekends={disableWeekends} />;
          })}
        </Flex>
      ))}
    </Flex>
  );
};
