import { fetchEndpoint } from '../utils/fetchEndpoint';
import { Action, ActionCreator, Dispatch } from 'redux';
import { CustomAction, ThunkResult } from 'src/App/interfaces';
import Character from '../models/savageWorldsCharacter';


/**
 * Get all characters
 */
export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';

export function fetchCharactersRequest() {
  return { type: FETCH_CHARACTERS_REQUEST };
}
export function fetchCharactersSuccess(payload: Character) {
  return { type: FETCH_CHARACTERS_SUCCESS, payload }
}
export function fetchCharactersFailure(error: string) {
  return { type: FETCH_CHARACTERS_FAILURE, error }
}

type FetchCharacterThunkResult = ThunkResult<Promise<CustomAction<Character>>, Character>
export const fetchCharacters: ActionCreator<FetchCharacterThunkResult> = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCharactersRequest());

    // TODO get ruleset from App store
    const endpoint = getState().app.ruleset;
    try {
      const payload: Character = await fetchEndpoint(`${endpoint}/characters`)
      return dispatch(fetchCharactersSuccess(payload));
    } catch (error) {
      return dispatch(fetchCharactersFailure(error));
    }
  }
}

/**
 * Delte character
 */
export const DELETE_CHARACTER_REQUEST = 'DELETE_CHARACTER_REQUEST';
export const DELETE_CHARACTER_SUCCESS = 'DELETE_CHARACTER_SUCCESS';
export const DELETE_CHARACTER_FAILURE = 'DELETE_CHARACTER_FAILURE';

export function deleteCharacterRequest() {
  return { type: DELETE_CHARACTER_REQUEST };
}
export function deleteCharacterSuccess(payload: Character) {
  return { type: DELETE_CHARACTER_SUCCESS }
}
export function deleteCharacterFailure(error: string) {
  return { type: DELETE_CHARACTER_FAILURE, error }
}

type DeleteCharacterThunkResult = ThunkResult<Promise<CustomAction<Character>>, Character>
export function deleteCharacter(characterId: string): DeleteCharacterThunkResult {
  return async (dispatch, getState) => {
    dispatch(deleteCharacterRequest());

    const endpoint = getState().app.ruleset;
    try {
      const payload: Character = await fetchEndpoint(`${endpoint}/characters/${characterId}`, 'delete')
      return dispatch(deleteCharacterSuccess(payload));
    } catch (error) {
      return dispatch(deleteCharacterFailure(error));
    }
  }
}

/**
 * Get one specific character
 */
export const FETCH_CHARACTER_REQUEST = 'FETCH_CHARACTER_REQUEST';
export const FETCH_CHARACTER_SUCCESS = 'FETCH_CHARACTER_SUCCESS';
export const FETCH_CHARACTER_FAILURE = 'FETCH_CHARACTER_FAILURE';

export function fetchCharacterRequest() {
  return { type: FETCH_CHARACTER_REQUEST };
}
export function fetchCharacterSuccess(payload: Character) {
  return { type: FETCH_CHARACTER_SUCCESS, payload }
}
export function fetchCharacterFailure(error: string) {
  return { type: FETCH_CHARACTER_FAILURE, error }
}

export function fetchCharacter(id: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(fetchCharacterRequest());


    const endpoint = getState().app.ruleset;
    return fetchEndpoint(`${endpoint}/characters/${id}`)
      .then(payload => {
        dispatch(fetchCharacterSuccess(payload));
      })
      .catch(err => {
        dispatch(fetchCharacterFailure(err));
      });
  }
}


/**
 * Update character
 */
export const UPSERT_CHARACTER_REQUEST = 'UPSERT_CHARACTER_REQUEST';
export const UPSERT_CHARACTER_SUCCESS = 'UPSERT_CHARACTER_SUCCESS';
export const UPSERT_CHARACTER_FAILURE = 'UPSERT_CHARACTER_FAILURE';

export function upsertCharacterRequest() {
  return { type: UPSERT_CHARACTER_REQUEST };
}
export function upsertCharacterSuccess(payload: Character) {
  return { type: UPSERT_CHARACTER_SUCCESS, payload }
}
export function upsertCharacterFailure(error: string) {
  return { type: UPSERT_CHARACTER_FAILURE, error }
}

export function upsertCharacter(character: Character) {
  return (dispatch: Function, getState: Function) => {
    dispatch(upsertCharacterRequest());

    // Remove id from character to allow update
    const endpoint = getState().app.ruleset;
    const body = { ...character }
    body.id = '';
    return fetchEndpoint(`${endpoint}/characters/${character.id}`, 'put', body)
      .then(payload => {
        dispatch(upsertCharacterSuccess(payload));
      })
      .catch(err => {
        dispatch(upsertCharacterFailure(err));
      });
  }
}

