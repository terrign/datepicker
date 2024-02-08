import { CloseIcon } from 'components/UI/Icons';
import { useApp } from 'hooks/useApp';
import { useEventListener } from 'hooks/useEventListener';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { ModalCloseButton, StyledModal } from './styled';

export interface ModalProps extends PropsWithChildren {
  onClose: () => void;
  open: boolean;
}

export function Modal({ children, onClose, open }: ModalProps) {
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
      <StyledModal>
        {children}
        <ModalCloseButton onClick={closeButtonHandler}>
          <CloseIcon />
        </ModalCloseButton>
      </StyledModal>,
      calendarContainerRef?.current ?? document.body,
    )
  );
}
