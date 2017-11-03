import { combineReducers } from 'redux';

// Reducers
import { routerReducer } from 'react-router-redux';
import { charPageReducer } from './CharPage/reducer';

export default combineReducers({
  routing: routerReducer,
  charPage: charPageReducer
})