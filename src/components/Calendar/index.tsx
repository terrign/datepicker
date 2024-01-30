import { Controls } from './Controls';
import { Month } from './Month';
import { Container } from './styled';
import { WeekDays } from './Weekdays';

interface CalendarProps {
  hidden: boolean;
}

export const Calendar = ({ hidden }: CalendarProps) => {
  return (
    <Container $hidden={hidden}>
      <Controls />
      <WeekDays />
      <Month />
    </Container>
  );
};
