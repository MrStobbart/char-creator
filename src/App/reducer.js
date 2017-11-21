import {
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
  DELETE_CHARACTER_REQUEST,
  DELETE_CHARACTER_SUCCESS,
  DELETE_CHARACTER_FAILURE,
  FETCH_SHEET_REQUEST,
  FETCH_SHEET_SUCCESS,
  FETCH_SHEET_FAILURE,
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE,
  CREATE_CHARACTER_REQUEST,
  CREATE_CHARACTER_SUCCESS,
  CREATE_CHARACTER_FAILURE,
  UPDATE_CHARACTER_REQUEST,
  UPDATE_CHARACTER_SUCCESS,
  UPDATE_CHARACTER_FAILURE,
} from './actions';

const initialState = {
  loading: false,
  characters: undefined,
  charSheet: undefined,
  ruleset: 'savageworldsfantasy'
};

export function AppReducer(state = initialState, action) {
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
    case FETCH_SHEET_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_SHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        charSheet: action.payload
      }
    case FETCH_SHEET_FAILURE:
      console.error(action.error)
      return {
        ...state,
        loading: false,
      }
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        character: action.payload,
        loading: false
      }
    case FETCH_CHARACTER_FAILURE:
      return {
        ...state,
        loading: false
      }
    case CREATE_CHARACTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_CHARACTER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case CREATE_CHARACTER_FAILURE:
      console.error(action.error)
      return {
        ...state,
        loading: false
      }
    case UPDATE_CHARACTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_CHARACTER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case UPDATE_CHARACTER_FAILURE:
      console.error(action.error)
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
