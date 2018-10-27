import { combineReducers } from 'redux';
import { Reducer } from 'redux';

// Reducers
import { routerReducer, RouterState } from 'react-router-redux';
import { AppReducer, AppState } from './App/reducer';

export interface Store {
  app: AppState,
  routing: Reducer<RouterState>
}


export default combineReducers({
  routing: routerReducer,
  app: AppReducer,
})