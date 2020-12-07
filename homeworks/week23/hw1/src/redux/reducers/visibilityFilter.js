import { VISIBILITY_FILTERS } from '../../constans'
import { SET_FILTER } from '../actionTypes'

const initialState = VISIBILITY_FILTERS.ALL;

export default function visibilityFilter(state = initialState, action) {
  switch(action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
}
