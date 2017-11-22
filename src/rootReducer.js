import { combineReducers } from 'redux';

// Reducers
import { routerReducer } from 'react-router-redux';
import { AppReducer } from './App/reducer';


export default combineReducers({
  routing: routerReducer,
  app: AppReducer,
})