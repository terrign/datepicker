import { font } from '@css';
import styled from 'styled-components';

export const ModalMenuButton = styled.button`
  ${font}
  border: none;
  outline: none;
  background: ${({ theme }) => theme.modalBg};
  color: ${({ theme }) => theme.modalButtonColor};

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.modalButtonHoverBgColor};
    color: ${({ theme }) => theme.modalButtonHoverColor};
  }
`;
