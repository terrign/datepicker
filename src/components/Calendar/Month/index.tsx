import { createCalendarMonthView } from '@utils';
import { Day } from 'components/Calendar/Day';
import { DayType } from 'components/Calendar/Day/types';
import { Flex } from 'components/UI/Flex';
import { useApp } from 'context/App';

export const Month = () => {
  const { firstDayOfTheViewMonth, weekStart } = useApp();
  const data = createCalendarMonthView(firstDayOfTheViewMonth, weekStart);
  return (
    <Flex $dir="col">
      {data.map((week) => (
        <Flex key={week[0].date} style={{ width: '100%' }}>
          {week.map(({ date }) => {
            return <Day date={new Date(date)} key={date} type={DayType.DEFAULT} />;
          })}
        </Flex>
      ))}
    </Flex>
  );
};
