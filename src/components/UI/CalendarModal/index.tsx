import { CloseIcon } from 'components/UI/Icons';
import { useApp } from 'hooks/useApp';
import { useEventListener } from 'hooks/useEventListener';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { CalendarModalCloseButton, StyledCalendarModal } from './styled';

export interface CalendarModalProps extends PropsWithChildren {
  onClose: () => void;
  open: boolean;
}

export function CalendarModal({ children, onClose, open }: CalendarModalProps) {
  const { calendarContainerRef } = useApp();

  const closeButtonHandler = () => {
    onClose();
  };

  const escPressHandler = (event: KeyboardEvent) => {
    event.key === 'Escape' && onClose();
  };

  useEventListener(document.body, 'keydown', escPressHandler);

  return (
    open &&
    createPortal(
      <StyledCalendarModal>
        {children}
        <CalendarModalCloseButton onClick={closeButtonHandler}>
          <CloseIcon />
        </CalendarModalCloseButton>
      </StyledCalendarModal>,
      calendarContainerRef?.current ?? document.body,
    )
  );
}
