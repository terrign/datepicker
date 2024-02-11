import styled from 'styled-components';

export interface FlexProps {
  $dir?: 'col' | 'row';
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-direction: ${({ $dir }) => ($dir === 'col' ? 'column' : 'row')};
`;
