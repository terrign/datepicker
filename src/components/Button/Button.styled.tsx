import styled from 'styled-components';

interface StyledButtonProps {
  $borderRadius: number;
  $primary: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  color: ${({ $primary }) => ($primary ? 'red' : 'blue')};
`;
