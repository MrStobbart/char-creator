import Character from '../models/savageWorldsCharacter';
import { QualityData } from './interfaces';
import { createContext } from 'react';

export type AppAction =
  | { type: 'setRules'; rules: string }
  | { type: 'setCharacters'; characters: Character[] }
  | { type: 'upsertCharacter'; character: Character }
  | { type: 'deleteCharacter'; id: string }
  | { type: 'setQualities'; qualities: QualityData };

export interface AppState {
  characters: Character[];
  qualities: QualityData;
  rules: string;
}

export const initialState: AppState = {
  characters: [],
  qualities: {
    edges: [],
    hindrances: [],
  },
  rules: 'savage-worlds-fantasy',
};

export function appReducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case 'setRules':
      return {
        ...state,
        rules: action.rules,
      };
    case 'setCharacters':
      return {
        ...state,
        characters: action.characters,
      };
    case 'upsertCharacter':
      let newCharacters = [...state.characters];
      const index = state.characters.findIndex(character => character.id === action.character.id);

      if (index === -1) {
        // Inserted
        newCharacters.push(action.character);
      } else {
        // Updated
        newCharacters[index] = action.character;
      }
      return {
        ...state,
        characters: newCharacters,
      };
    case 'deleteCharacter':
      return {
        ...state,
        characters: state.characters.filter(character => character.id !== action.id),
      };
    case 'setQualities':
      return {
        ...state,
        qualities: action.qualities,
      };
    default:
      return state;
  }
}
