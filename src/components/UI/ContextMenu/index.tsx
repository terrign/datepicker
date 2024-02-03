import { StyledContextMenu } from 'components/UI/ContextMenu/styled';
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ContextMenu extends PropsWithChildren {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  position: [number, number];
}

export const ContextMenu = ({ visible, position, children, setVisible }: ContextMenu) => {
  const [x, y] = position;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outerClickHandler = (event: MouseEvent) => {
      if (event.target !== ref.current) {
        setVisible(false);
      }
    };
    document.body.addEventListener('click', outerClickHandler);

    return () => {
      document.body.removeEventListener('click', outerClickHandler);
    };
  }, [setVisible]);
  return (
    visible &&
    createPortal(
      <StyledContextMenu $x={x} $y={y} ref={ref}>
        {children}
      </StyledContextMenu>,
      document.body,
    )
  );
};
