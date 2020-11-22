/* eslint-disable import/no-unresolved, no-plusplus, arrow-parens */
/* eslint-disable react/jsx-filename-extension, no-shadow */
/* eslint-disable no-plusplus, react/react-in-jsx-scope, consistent-return */

import React, { useState, useEffect, useRef } from 'react';
import useInput from './useInput';
import TodoItem from './TodoItem';

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export default function useTodos() {
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem('todos') || '';
    if (todoData) {
      todoData = JSON.parse(todoData);
      if (todoData.length > 0) {
        id.current = todoData[0].id + 1;
      }
    } else {
      todoData = [];
    }
    return todoData;
  });
  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);
  const { value, setValue, handleChange } = useInput();
  const [filter, setFilter] = useState('all');
  const handleButtonClick = () => {
    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false,
      },
      ...todos,
    ]);
    setValue('');
    id.current++;
  };

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleIsDone = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }),
    );
  };

  const handleFilterAll = () => {
    setFilter('all');
  };

  const handleFilterDone = () => {
    setFilter('done');
  };

  const handleFilterNotDone = () => {
    setFilter('notDone');
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  function isFilterState(filter, todos) {
    if (filter === 'all') {
      return todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ));
    }
    if (filter === 'done') {
      return todos
        .filter((todo) => todo.isDone)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsDone={handleToggleIsDone}
          />
        ));
    }
    if (filter === 'notDone') {
      return todos
        .filter((todo) => !todo.isDone)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsDone={handleToggleIsDone}
          />
        ));
    }
  }
  return {
    id,
    todos,
    setTodos,
    value,
    setValue,
    handleChange,
    handleButtonClick,
    filter,
    setFilter,
    handleFilterAll,
    handleFilterDone,
    handleFilterNotDone,
    handleClearAll,
    isFilterState,
  };
}
