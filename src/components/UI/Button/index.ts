import { defaultBlock } from '@constants';
import styled, { css } from 'styled-components';

const buttonHover = css`
  &:hover {
    background: ${({ theme }) => theme.hoverBgColor};
  }
`;

const controlButton = css`
  height: 24px;
  width: 24px;
`;

export const Button = styled.button<{ $nohover?: boolean; $control?: boolean }>`
  ${defaultBlock}

  background: none;
  cursor: pointer;

  ${({ $nohover }) => !$nohover && buttonHover}
  ${({ $control }) => $control && controlButton}
`;
