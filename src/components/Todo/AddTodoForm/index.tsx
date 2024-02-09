import { TODO_DESC_MAX_LENGTH, TODO_TITLE_MAX_LENGTH } from '@constants';
import { Todo } from '@types';
import { getUniqueId } from '@utils';
import { StyledTodoForm, TodoButton } from 'components/Todo/styled';
import { ChangeEvent, FormEventHandler, useId, useState } from 'react';

interface AddTodoFormProps {
  date: string;
  closeModal: () => void;
  addTodo: (todo: Todo) => void;
}

export const AddTodoForm = ({ date, closeModal, addTodo }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const titleId = useId();
  const descId = useId();

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const descChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    addTodo({ date, desc, title, id: getUniqueId() });
    closeModal();
  };

  return (
    <>
      <h3>{date}</h3>
      <StyledTodoForm onSubmit={onSubmit}>
        <label htmlFor={titleId}>Title</label>
        <input
          id={titleId}
          name="title"
          value={title}
          onChange={titleChangeHandler}
          required
          maxLength={TODO_TITLE_MAX_LENGTH}
        />
        <label htmlFor={descId}>Description</label>
        <textarea
          id={descId}
          name="description"
          value={desc}
          onChange={descChangeHandler}
          maxLength={TODO_DESC_MAX_LENGTH}
        />
        <TodoButton>Add</TodoButton>
      </StyledTodoForm>
    </>
  );
};
