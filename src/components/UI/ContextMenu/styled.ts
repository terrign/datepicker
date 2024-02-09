import { flex, font } from '@constants';
import styled from 'styled-components';

interface Props {
  $x: number;
  $y: number;
}

export const StyledContextMenu = styled.div<Props>`
  ${flex}

  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.contextMenuBg};

  position: absolute;
  flex-direction: column;
  z-index: 201;

  button {
    ${font}

    border: none;
    outline: none;
    padding: 5px;
    white-space: nowrap;
    width: 100%;

    background: ${({ theme }) => theme.contextMenuBg};
    color: ${({ theme }) => theme.contextMenuButtonColor};

    &:hover {
      cursor: pointer;

      background: ${({ theme }) => theme.contextMenuButtonHoverBgColor};
      color: ${({ theme }) => theme.contextMenuButtonHoverColor};
    }
  }
`;
