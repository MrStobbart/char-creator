import {
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE,
  DELETE_CHARACTER_REQUEST,
  DELETE_CHARACTER_SUCCESS,
  DELETE_CHARACTER_FAILURE,
} from './actions';

const initialState = {
  loading: false,
  characters: [],
  ruleset: 'savageworldsfantasy'
};

export function CharactersPageReducer(state = initialState, action) {
  console.log('dispatched action:', state, action)
  switch (action.type) { 
    case FETCH_CHARACTERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.payload,
        loading: false
      }
    case FETCH_CHARACTERS_FAILURE:
      console.error(action.error)
      return {
        ...state,
        loading: false
      }
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        characters: [action.payload],
        loading: false
      }
    case FETCH_CHARACTER_FAILURE:
      return {
        ...state,
        loading: false
      }
    case DELETE_CHARACTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_CHARACTER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_CHARACTER_FAILURE:
      console.error(action.error)
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}