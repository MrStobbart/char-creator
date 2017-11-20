import { combineReducers } from 'redux';

// Reducers
import { routerReducer } from 'react-router-redux';
import { charPageReducer } from './CharPage/reducer';
import { CharactersPageReducer } from './Characters/reducer';


export default combineReducers({
  routing: routerReducer,
  charPage: charPageReducer,
  charactersPage: CharactersPageReducer
})