import { CalendarProps } from 'components/Calendar';
import { AddTodoForm } from 'components/Todo/AddTodoForm';
import { TodoList } from 'components/Todo/TodoList';
import { ViewTodoButton } from 'components/Todo/ViewTodoButton';
import { CalendarModal } from 'components/UI/CalendarModal';
import { useTodoStore } from 'hooks/useTodoStore';
import { FC, useMemo, useState } from 'react';

export const withToDos = (Component: FC<CalendarProps>) => {
  const Wrapper = ({ contextMenuOptions, enableTodos, ...rest }: CalendarProps) => {
    const [addTodoModalOpen, setAddTodoModalOpen] = useState<boolean>(false);
    const [viewTodoModalOpen, setViewTodoModalOpen] = useState<boolean>(false);
    const [actionDate, setActionDate] = useState('');
    const { todos, removeTodo, addTodo } = useTodoStore();

    const closeAddTodoModal = () => {
      setAddTodoModalOpen(false);
    };

    const closeViewTodoModal = () => {
      setViewTodoModalOpen(false);
    };

    const composedContextMenuOptions = useMemo(() => {
      const derivedOptions = contextMenuOptions ?? [];
      if (enableTodos) {
        return [
          {
            label: 'Add Todo',
            onClick(date) {
              setActionDate(date);
              setAddTodoModalOpen(true);
            },
          },
          ...derivedOptions,
        ];
      }

      return contextMenuOptions;
    }, [contextMenuOptions, enableTodos]);

    if (!composedContextMenuOptions) {
      return <Component {...rest} />;
    }

    return (
      <>
        <Component {...rest} contextMenuOptions={composedContextMenuOptions}>
          {todos.length !== 0 && !viewTodoModalOpen && !addTodoModalOpen && (
            <ViewTodoButton onClick={() => setViewTodoModalOpen(true)} todosCount={todos.length} />
          )}
        </Component>
        <CalendarModal open={addTodoModalOpen} onClose={closeAddTodoModal}>
          <AddTodoForm date={actionDate} closeModal={closeAddTodoModal} addTodo={addTodo} />
        </CalendarModal>
        <CalendarModal open={viewTodoModalOpen} onClose={closeViewTodoModal}>
          <TodoList todos={todos} removeTodo={removeTodo} />
        </CalendarModal>
      </>
    );
  };
  Wrapper.displayName = Component.name;
  return Wrapper;
};
