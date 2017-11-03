import {
  FETCH_SHEET_REQUEST,
  FETCH_SHEET_SUCCESS,
  FETCH_SHEET_FAILURE
} from './actions';

const initialState = {
  loading: false,
  error: false,
  charSheet: [],
  sheetFieldsets: []
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
        charSheet: action.charSheet
      }  
    case FETCH_SHEET_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
    }  
    default:
      return state;  
  }
}