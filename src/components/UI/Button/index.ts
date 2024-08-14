import { defaultBlock, font } from '@constants';
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

export const Button = styled.button.attrs<{ $nohover?: boolean; $control?: boolean }>((props) => {
  return {
    ...props,
    type: 'button',
  };
})`
  ${font}
  ${defaultBlock}

  background: none;
  cursor: pointer;

  ${({ $nohover }) => !$nohover && buttonHover}
  ${({ $control }) => $control && controlButton}

  &:disabled {
    color: ${({ theme }) => theme.disabledDayFontColor};
    background: none;
    cursor: default;
  }
`;
