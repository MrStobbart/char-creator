import {
  FETCH_SHEET_REQUEST,
  FETCH_SHEET_SUCCESS,
  FETCH_SHEET_FAILURE,
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
  CREATE_CHARACTER_REQUEST,
  CREATE_CHARACTER_SUCCESS,
  CREATE_CHARACTER_FAILURE,
  UPDATE_CHARACTER_REQUEST,
  UPDATE_CHARACTER_SUCCESS,
  UPDATE_CHARACTER_FAILURE,
  DELETE_CHARACTER_REQUEST,
  DELETE_CHARACTER_SUCCESS,
  DELETE_CHARACTER_FAILURE,
} from './actions';

const initialState = {
  loading: false,
  charSheet: {
    id: '',
    name: '',
    meta: {},
    fieldsets: []
  },
  ruleset: 'savageworldsfantasy'
};

export function charPageReducer(state = initialState, action) {
  console.log('dispatched action:', state, action)
  switch (action.type) {
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
    case FETCH_CHARACTERS_REQUEST:
      return { 
        ...state,
        loading: true
      }
    case FETCH_CHARACTERS_SUCCESS:
      return { 
        ...state,
        loading: false
      }
    case FETCH_CHARACTERS_FAILURE:
      console.error(action.error)
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