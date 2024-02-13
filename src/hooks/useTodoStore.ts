import { TODO_STORAGE_KEY } from '@constants';
import { Todo } from '@types';
import { useEffect, useState } from 'react';

export const useTodoStore = () => {
  const [todos, setTodos] = useState(() => getTodosFromLocal());

  function getTodosFromLocal() {
    const todos = localStorage.getItem(TODO_STORAGE_KEY);

    if (todos) {
      return JSON.parse(todos) as Todo[];
    }

    return [];
  }

  function addTodo(todo: Todo) {
    setTodos((prevTodos) => [todo, ...prevTodos]);
  }

  function removeTodo(id: string) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function clearTodos() {
    setTodos([]);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return { todos, addTodo, removeTodo, clearTodos };
};
