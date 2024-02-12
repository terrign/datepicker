import { TodoButton } from '@components/Todo/styled';
import { ToolTip } from '@components/Todo/ViewTodoButton/styled';

interface ViewTodoButtonProps {
  onClick: () => void;
  todosCount: number;
}

export const ViewTodoButton = ({ onClick, todosCount }: ViewTodoButtonProps) => {
  const buttonLabel = `You have ${todosCount > 1 ? todosCount + ' todos' : todosCount + ' todo'}`;
  return todosCount === 0 ? (
    <ToolTip>Right click date to add todo!</ToolTip>
  ) : (
    <TodoButton onClick={onClick} type="button">
      {buttonLabel}
    </TodoButton>
  );
};
