import { createCalendarMonthView } from '@utils';
import { Day } from 'components/Day';
import { DayType } from 'components/Day/types';
import { Flex } from 'components/UI/Flex';
import { useApp } from 'context/App';

export const Month = () => {
  const { currentDate, weekStart } = useApp();
  const data = createCalendarMonthView(currentDate, weekStart);
  return (
    <Flex $dir="col">
      {data.map((week) => (
        <Flex key={Math.random() * Math.random()} style={{ width: '100%' }}>
          {week.map(({ date }) => {
            return <Day date={new Date(date)} key={Math.random() * Math.random()} type={DayType.DEFAULT} />;
          })}
        </Flex>
      ))}
    </Flex>
  );
};
