import { fetchEndpoint } from '../utils/fetchEndpoint';
import { Action, ActionCreator, Dispatch } from 'redux';
import { AppAction, ThunkResult, QualityData } from 'src/App/interfaces';
import Character from '../models/savageWorldsCharacter';
import { CharProperty, CharData } from 'src/models/interfaces';


/**
 * Get all characters
 */
export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';

export function fetchCharactersRequest() {
  return { type: FETCH_CHARACTERS_REQUEST };
}
export function fetchCharactersSuccess(payload: Character[]) {
  return { type: FETCH_CHARACTERS_SUCCESS, payload }
}
export function fetchCharactersFailure(error: string) {
  return { type: FETCH_CHARACTERS_FAILURE, error }
}

type FetchCharactersThunkResult = ThunkResult<Promise<AppAction<Character[]>>, Character[]>
export const fetchCharacters: ActionCreator<FetchCharactersThunkResult> = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCharactersRequest());

    // TODO get ruleset from App store
    const endpoint = getState().app.ruleset;
    try {
      // TODO change data to characters somewhere
      const payload: CharData[] = await fetchEndpoint(`${endpoint}/characters`)
      const timeName = 'Creating all character instances.'
      console.time(timeName)
      const characters = payload.map(characterData => new Character(characterData))
      console.timeEnd(timeName)
      return dispatch(fetchCharactersSuccess(characters));
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
export function deleteCharacterSuccess(characterId: string) {
  return { type: DELETE_CHARACTER_SUCCESS, payload: characterId }
}
export function deleteCharacterFailure(error: string) {
  return { type: DELETE_CHARACTER_FAILURE, error }
}

type DeleteCharacterThunkResult = ThunkResult<Promise<AppAction<string>>, string>
export function deleteCharacter(characterId: string): DeleteCharacterThunkResult {
  return async (dispatch, getState) => {
    dispatch(deleteCharacterRequest());

    const endpoint = getState().app.ruleset;
    try {
      await fetchEndpoint(`${endpoint}/characters/${characterId}`, 'delete')
      // TODO error handling here
      return dispatch(deleteCharacterSuccess(characterId));
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

type FetchCharacterThunkResult = ThunkResult<Promise<AppAction<Character>>, Character>
export function fetchCharacter(id: string): FetchCharacterThunkResult {

  return async (dispatch, getState) => {
    // TODO is not being reached
    console.log('fetch character');
    dispatch(fetchCharacterRequest());

    const endpoint = getState().app.ruleset;
    try {
      const characterData: CharData = await fetchEndpoint(`${endpoint}/characters/${id}`)
      console.log('character', characterData);
      const character = new Character(characterData)
      return dispatch(fetchCharacterSuccess(character));
    } catch (error) {
      return dispatch(fetchCharacterFailure(error));
    }
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

type UpsertCharacterThunkResult = ThunkResult<Promise<AppAction<Character>>, Character>
export function upsertCharacter(character: Character): UpsertCharacterThunkResult {
  return async (dispatch: Function, getState: Function) => {
    dispatch(upsertCharacterRequest());

    // Remove id from character to allow update
    const endpoint = getState().app.ruleset;
    const body = character.getJson()
    console.log(body);
    try {
      const payload: Character = await fetchEndpoint(`${endpoint}/characters/${character.id}`, 'put', body)
      return dispatch(upsertCharacterSuccess(payload))
    } catch (error) {
      return dispatch(upsertCharacterFailure(error));
    }
  }
}

export const FETCH_QUALITIES_REQUEST = 'FETCH_QUALITIES_REQUEST';
export const FETCH_QUALITIES_SUCCESS = 'FETCH_QUALITIES_SUCCESS';
export const FETCH_QUALITIES_FAILURE = 'FETCH_QUALITIES_FAILURE';

export function fetchQualitiesRequest() {
  return { type: FETCH_QUALITIES_REQUEST };
}
export function fetchQualitiesSuccess(payload: QualityData) {
  return { type: FETCH_QUALITIES_SUCCESS, payload }
}
export function fetchQualitiesFailure(error: string) {
  return { type: FETCH_QUALITIES_FAILURE, error }
}

type FetchQualitiesThunkResult = ThunkResult<Promise<AppAction<QualityData>>, QualityData>
export const fetchQualities: ActionCreator<FetchQualitiesThunkResult> = () => {
  return async (dispatch, getState) => {
    dispatch(fetchQualitiesRequest());

    const endpoint = getState().app.ruleset;
    try {
      const payload: QualityData = await fetchEndpoint(`${endpoint}/qualities`)
      return dispatch(fetchQualitiesSuccess(payload));
    } catch (error) {
      return dispatch(fetchQualitiesFailure(error));
    }
  }
}

