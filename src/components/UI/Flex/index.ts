import styled from 'styled-components';

export interface FlexProps {
  $dir?: 'col' | 'row';
  $gap?: number;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $dir }) => ($dir === 'col' ? 'column' : 'row')};
  gap: ${({ $gap }) => $gap && `${$gap}px`};
  justify-content: space-between;
  align-items: center;
`;
