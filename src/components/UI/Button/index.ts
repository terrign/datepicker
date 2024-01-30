import { defaultBlock } from '@css';
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

  margin: 0px;
  cursor: pointer;
  ${({ $nohover }) => !$nohover && buttonHover}
  ${({ $control }) => $control && controlButton}
`;
