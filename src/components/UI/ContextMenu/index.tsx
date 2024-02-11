import { StyledContextMenu } from 'components/UI/ContextMenu/styled';
import { useApp } from 'hooks/useApp';
import { useEventListener } from 'hooks/useEventListener';
import { Dispatch, PropsWithChildren, SetStateAction, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ContextMenu extends PropsWithChildren {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  position: [number, number];
}

export const ContextMenu = ({ visible, position, children, setVisible }: ContextMenu) => {
  const [x, y] = position;
  const ref = useRef<HTMLDivElement>(null);
  const { calendarContainerRef } = useApp();

  const outerClickHandler = (event: MouseEvent) => {
    if (event.target !== ref.current) {
      setVisible(false);
    }
  };

  useEventListener(document.body, 'click', outerClickHandler);

  const container = (() => {
    if (calendarContainerRef && calendarContainerRef.current) {
      return calendarContainerRef.current;
    }
    return document.body;
  })();

  return (
    visible &&
    createPortal(
      <StyledContextMenu $x={x} $y={y} ref={ref}>
        {children}
      </StyledContextMenu>,
      container,
    )
  );
};
