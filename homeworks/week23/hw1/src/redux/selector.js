import { VISIBILITY_FILTERS } from '../constans';

export const selectTodos = store => store.todos.todos

export const filterState = store => store.visibilityFilter

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
    const allTodos = store.todos.todos;
  switch(visibilityFilter) {
    case VISIBILITY_FILTERS.ALL: {
      return allTodos;
    }
    case VISIBILITY_FILTERS.COMPLETED: {
      return allTodos.filter(todo => todo.isComplete)
    }
    case VISIBILITY_FILTERS.UNCOMPLETE: {
      return allTodos.filter(todo => !todo.isComplete)
    }
    default: {
      return allTodos
    }
  }
}
