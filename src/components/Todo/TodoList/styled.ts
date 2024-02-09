import { border, DEFAULT_PADDING } from '@constants';
import styled from 'styled-components';

export const TodoItem = styled.article`
  ${border}
  border-radius: ${({ theme }) => theme.borderRadius}px;

  display: grid;
  grid-template-columns: repeat(1, 200px);
  place-self: start;
  gap: 5px;
  padding: 5px;
  box-sizing: border-box;

  h4,
  p {
    margin: 0;
    word-wrap: break-word;
  }

  p {
    color: ${({ theme }) => theme.disabledDayFontColor};
  }
`;

export const StyledTodoList = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  padding: ${DEFAULT_PADDING}px;
  margin-bottom: 10px;
  box-sizing: border-box;

  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
