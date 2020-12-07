import React from "react";
import { useSelector } from "react-redux";
import { getTodosByVisibilityFilter, filterState } from '../redux/selector'
import TodoItem from './TodoItem';



export default function TodoList() {
  const state = useSelector(store => store)
  const filter = useSelector(filterState)
  const todos = getTodosByVisibilityFilter(state, filter)
  return (
    todos.map(todo => (
      <TodoItem key={todo.id} todo={todo}/>
    ))
  );
}

