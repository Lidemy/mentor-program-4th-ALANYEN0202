import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import VisibilityFilters from './components/VisibilityFilters';

function App() {
  return (
    <div className="Todo">
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}

export default App;
