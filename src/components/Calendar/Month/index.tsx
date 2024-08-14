import { Day } from '@components/Calendar/Day';
import { Week } from '@components/Calendar/Month/styled';
import { Flex } from '@components/UI/Flex';
import { UndefinedTypeDayProps } from '@decorators/Day/withDefinedDayType';
import { DateString } from '@types';

export interface DaysOfTheMonthData {
  days: UndefinedTypeDayProps[][];
  disableWeekends?: boolean;
  onDateSelect?: (dateString: DateString) => void;
}

export const Month = ({ days, disableWeekends, onDateSelect }: DaysOfTheMonthData) => {
  return (
    <Flex $dir="col">
      {days.map((week) => (
        <Week key={week[0].date}>
          {week.map((dayProps) => {
            return (
              <Day key={dayProps.date} disableWeekends={disableWeekends} {...dayProps} onDateSelect={onDateSelect} />
            );
          })}
        </Week>
      ))}
    </Flex>
  );
};
