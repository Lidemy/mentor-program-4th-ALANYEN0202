import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, CLEAR_TODO, SET_FILTER } from './actionTypes'

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
    }
  }
}


export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    }
  }
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    }
  }
}

export function clearTodo() {
  return {
    type: CLEAR_TODO,
  }
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: {
      filter
    }
  }
}
