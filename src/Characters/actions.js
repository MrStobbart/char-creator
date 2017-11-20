import { fetchEndpoint } from '../utils/fetchEndpoint';


/**
 * Get all characters
 */
export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';

export function fetchCharactersRequest() {
  return { type: FETCH_CHARACTERS_REQUEST };
}
export function fetchCharactersSuccess(payload) {
  return { type: FETCH_CHARACTERS_SUCCESS, payload }
}
export function fetchCharactersFailure(error) {
  return { type: FETCH_CHARACTERS_FAILURE, error }
}

export function fetchCharacters() {
  return (dispatch, getState) => {
    dispatch(fetchCharactersRequest());

    // TODO get ruleset from App store
    const endpoint = getState().charPage.ruleset;
    return fetchEndpoint(`${endpoint}/characters`)
      .then(payload => {
        dispatch(fetchCharactersSuccess(payload));
      })
      .catch(err => {
        dispatch(fetchCharactersFailure(err));
      });
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
export function fetchCharacterSuccess(payload) {
  return { type: FETCH_CHARACTER_SUCCESS, payload }
}
export function fetchCharacterFailure(error) {
  return { type: FETCH_CHARACTER_FAILURE, error }
}

export function fetchCharacter(id) {
  return (dispatch, getState) => {
    dispatch(fetchCharacterRequest());

    const endpoint = getState().charPage.ruleset;
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
 * Delte character
 */
export const DELETE_CHARACTER_REQUEST = 'DELETE_CHARACTER_REQUEST';
export const DELETE_CHARACTER_SUCCESS = 'DELETE_CHARACTER_SUCCESS';
export const DELETE_CHARACTER_FAILURE = 'DELETE_CHARACTER_FAILURE';

export function deleteCharacterRequest() {
  return { type: DELETE_CHARACTER_REQUEST };
}
export function deleteCharacterSuccess(payload) {
  return { type: DELETE_CHARACTER_SUCCESS, payload }
}
export function deleteCharacterFailure(error) {
  return { type: DELETE_CHARACTER_FAILURE, error }
}

export function deleteCharacter(character) {
  return (dispatch, getState) => {
    dispatch(deleteCharacterRequest());

    const endpoint = getState().charPage.ruleset;
    return fetchEndpoint(`${endpoint}/characters`, 'delete', character)
      .then(payload => {
        dispatch(deleteCharacterSuccess(payload));
      })
      .catch(err => {
        dispatch(deleteCharacterFailure(err));
      });
  }
}