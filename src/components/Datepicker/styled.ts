import { font } from '@css';
import styled from 'styled-components';

export const Container = styled.div`
  ${font}
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 8px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 250px;
`;
