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
    const endpoint = getState().app.ruleset;
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

export function deleteCharacter(characterId) {
  return (dispatch, getState) => {
    dispatch(deleteCharacterRequest());

    const endpoint = getState().app.ruleset;
    return fetchEndpoint(`${endpoint}/characters/${characterId}`, 'delete')
      .then(payload => {
        dispatch(deleteCharacterSuccess(payload));
      })
      .catch(err => {
        dispatch(deleteCharacterFailure(err));
      });
  }
}


/**
 * Get char sheet
 */
export const FETCH_SHEET_REQUEST = 'FETCH_SHEET_REQUEST';
export const FETCH_SHEET_SUCCESS = 'FETCH_SHEET_SUCCESS';
export const FETCH_SHEET_FAILURE = 'FETCH_SHEET_FAILURE';

export function fetchSheetRequest() {
  return { type: FETCH_SHEET_REQUEST };
}
export function fetchSheetSuccess(payload) {
  return { type: FETCH_SHEET_SUCCESS, payload }
}
export function fetchSheetFailure(error) {
  return { type: FETCH_SHEET_FAILURE, error }
}

export function fetchCharSheet() {
  return (dispatch, getState) => {
    dispatch(fetchSheetRequest());

    const endpoint = getState().app.ruleset;
    return fetchEndpoint(endpoint)
      .then(payload => {
        dispatch(fetchSheetSuccess(payload));
      })
      .catch(err => {
        dispatch(fetchSheetFailure(err));
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
export function upsertCharacterSuccess(payload) {
  return { type: UPSERT_CHARACTER_SUCCESS, payload }
}
export function upsertCharacterFailure(error) {
  return { type: UPSERT_CHARACTER_FAILURE, error }
}

export function upsertCharacter(character) {
  return (dispatch, getState) => {
    dispatch(upsertCharacterRequest());

    // Remove id from character to allow update
    const endpoint = getState().app.ruleset;
    const body = { ...character }
    body._id = undefined;
    return fetchEndpoint(`${endpoint}/characters/${character._id}`, 'put', body)
      .then(payload => {
        dispatch(upsertCharacterSuccess(payload));
      })
      .catch(err => {
        dispatch(upsertCharacterFailure(err));
      });
  }
}

