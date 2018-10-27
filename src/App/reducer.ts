import {
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
  DELETE_CHARACTER_REQUEST,
  DELETE_CHARACTER_SUCCESS,
  DELETE_CHARACTER_FAILURE,
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE,
  UPSERT_CHARACTER_REQUEST,
  UPSERT_CHARACTER_SUCCESS,
  UPSERT_CHARACTER_FAILURE,
} from './actions';

import Character from '../models/savageWorldsCharacter';



export interface AppState{
  loading: boolean,
  characters: Character[],
  ruleset: string
}

const initialState: AppState = {
  loading: false,
  characters: [],
  ruleset: 'savageworldsfantasy'
};

interface Action{
  type: string,
  payload: any
  error: string
}

export function AppReducer(state = initialState, action: Action) {
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
        characters: state.characters.filter(character => character.id !== action.payload.id),
        loading: false
      }
    case DELETE_CHARACTER_FAILURE:
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
        character: action.payload,
        loading: false
      }
    case FETCH_CHARACTER_FAILURE:
      return {
        ...state,
        loading: false
      }
    case UPSERT_CHARACTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPSERT_CHARACTER_SUCCESS:
      
      let newCharacters = [...state.characters];
      const index = state.characters.findIndex(character => character.id === action.payload.id)

      if (index === -1) {
        // Inserted
        newCharacters.push(action.payload)
      } else {
        // Updated
        newCharacters[index] = action.payload;
      }
      return {
        ...state,
        characters: newCharacters,
        loading: false
      }
    case UPSERT_CHARACTER_FAILURE:
      console.error(action.error)
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
