import { defaultBlock } from '@css';
import styled from 'styled-components';

export const Button = styled.button`
  ${defaultBlock}
  background: none;

  margin: 0px;

  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.hoverBgColor};
  }
`;
