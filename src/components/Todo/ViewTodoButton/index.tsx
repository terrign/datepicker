import { TodoButton } from 'components/Todo/styled';

interface ViewTodoButtonProps {
  onClick: () => void;
  todosCount: number;
}

export const ViewTodoButton = ({ onClick, todosCount }: ViewTodoButtonProps) => {
  const buttonLabel = `You have ${todosCount > 1 ? todosCount + ' todos' : todosCount + ' todo'}`;
  return <TodoButton onClick={onClick}>{buttonLabel}</TodoButton>;
};
