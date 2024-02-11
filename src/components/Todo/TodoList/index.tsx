import { Todo } from '@types';
import { TodoButton } from 'components/Todo/styled';

import { StyledTodoList, TodoItem } from './styled';

export interface TodoListProps {
  todos: Todo[];
  removeTodo: (id: string) => void;
}

export const TodoList = ({ todos, removeTodo }: TodoListProps) => {
  const getRemoveHandler = (id: string) => () => removeTodo(id);

  return (
    <>
      <h3>Todo List</h3>
      <StyledTodoList>
        {todos.map(({ date, desc, title, id }) => {
          return (
            <TodoItem key={id}>
              <h4>{date}</h4>
              <h4>{title}</h4>
              <p>{desc}</p>
              <TodoButton onClick={getRemoveHandler(id)}>Remove</TodoButton>
            </TodoItem>
          );
        })}
      </StyledTodoList>
    </>
  );
};
