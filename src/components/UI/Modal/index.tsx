import { CloseIcon } from 'components/UI/Icons';
import { useApp } from 'hooks/useApp';
import { PropsWithChildren, useEffect } from 'react';
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

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      event.key === 'Escape' && onClose();
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, [onClose]);

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
