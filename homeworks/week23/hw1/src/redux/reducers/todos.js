import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, CLEAR_TODO } from '../actionTypes'

const initialState = {
  todos: [],
}

let todoId = 0;

export default function todosReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos:[...state.todos,{
          id: todoId++,
          content: action.payload.content,
          isComplete: false
        }],
      }
      case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }
       case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if(todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isComplete: !todo.isComplete,
          }
        })
      }
      case CLEAR_TODO:
      return {
        todos: []
      }
      
    default: {
      return state;
    }
  }
}
