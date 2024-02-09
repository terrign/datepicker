import { border, DEFAULT_PADDING, input } from '@constants';
import styled from 'styled-components';

export const StyledTodoForm = styled.form`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  max-width: 230px;
  flex-grow: 1;
  padding: ${DEFAULT_PADDING}px;

  label {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    ${input}
    ${border}

    border-radius: ${({ theme }) => theme.borderRadius}px;

    box-sizing: border-box;
  }

  input,
  button {
    height: 24px;
  }

  textarea {
    height: 72px;
    resize: none;
  }

  button {
    align-self: end;
  }
`;

export const TodoButton = styled.button`
  ${input}
  ${border}

  border-radius: ${({ theme }) => theme.borderRadius}px;

  font-weight: 700;
  cursor: pointer;
  height: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.selectedDayBgColor};
    color: ${({ theme }) => theme.selectedDayFontColor};
  }
`;
