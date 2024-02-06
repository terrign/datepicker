import { CalendarProps } from 'components/Calendar';
import { ContextMenu } from 'components/UI/ContextMenu';
import { useContextMenu } from 'components/UI/ContextMenu/useContextMenu';
import { FC, useState } from 'react';

export const withDayContextMenu = (Component: FC<CalendarProps>) => {
  const Wrapper = ({ modalOptions, days, ...rest }: CalendarProps) => {
    const { x, y, setPosition, setVisible, visible } = useContextMenu();
    const [actionDate, setActionDate] = useState('');

    if (!modalOptions) {
      return <Component {...rest} days={days} />;
    }

    const newDays = days.map((week) =>
      week.map((day) => {
        const dayContextMenuHandler = (date: string, x: number, y: number) => {
          setPosition([x, y]);
          setActionDate(date);
          setVisible(true);
        };
        return {
          ...day,
          dayContextMenuHandler,
        };
      }),
    );
    return (
      <>
        <Component {...rest} days={newDays} />
        <ContextMenu visible={visible} position={[x, y]} setVisible={setVisible}>
          {modalOptions.map(({ label, onClick }) => (
            <button key={label} onClick={() => onClick(actionDate)}>
              {label}
            </button>
          ))}
        </ContextMenu>
      </>
    );
  };
  Wrapper.displayName = Component.name;
  return Wrapper;
};
