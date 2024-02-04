import { Day } from 'components/Calendar/Day';
import { UndefinedTypeDayProps } from 'components/Calendar/Day/decorators/withDefinedDayType';
import { Flex } from 'components/UI/Flex';

export interface DaysOfTheMonthData {
  days: UndefinedTypeDayProps[][];
  disableWeekends?: boolean;
  onDateSelect?: (dateString: string) => void;
}

export const Month = ({ days, disableWeekends, onDateSelect }: DaysOfTheMonthData) => {
  return (
    <Flex $dir="col">
      {days.map((week) => (
        <Flex key={week[0].date} style={{ width: '100%' }}>
          {week.map((dayProps) => {
            return (
              <Day key={dayProps.date} disableWeekends={disableWeekends} {...dayProps} onDateSelect={onDateSelect} />
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};
