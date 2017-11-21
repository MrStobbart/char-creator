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

export function deleteCharacter(character) {
  return (dispatch, getState) => {
    dispatch(deleteCharacterRequest());

    const endpoint = getState().app.ruleset;
    return fetchEndpoint(`${endpoint}/characters`, 'delete', character)
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
 * Create character
 */
export const CREATE_CHARACTER_REQUEST = 'CREATE_CHARACTER_REQUEST';
export const CREATE_CHARACTER_SUCCESS = 'CREATE_CHARACTER_SUCCESS';
export const CREATE_CHARACTER_FAILURE = 'CREATE_CHARACTER_FAILURE';

export function createCharacterRequest() {
  return { type: CREATE_CHARACTER_REQUEST };
}
export function createCharacterSuccess(payload) {
  return { type: CREATE_CHARACTER_SUCCESS, payload }
}
export function createCharacterFailure(error) {
  return { type: CREATE_CHARACTER_FAILURE, error }
}

export function createCharacter(character) {
  return (dispatch, getState) => {
    dispatch(createCharacterRequest());
    const endpoint = getState().app.ruleset;
    return fetchEndpoint(`${endpoint}/characters`, 'post', character)
      .then(payload => {
        dispatch(createCharacterSuccess(payload));
      })
      .catch(err => {
        dispatch(createCharacterFailure(err));
      });
  }
}

/**
 * Update character
 */
export const UPDATE_CHARACTER_REQUEST = 'UPDATE_CHARACTER_REQUEST';
export const UPDATE_CHARACTER_SUCCESS = 'UPDATE_CHARACTER_SUCCESS';
export const UPDATE_CHARACTER_FAILURE = 'UPDATE_CHARACTER_FAILURE';

export function updateCharacterRequest() {
  return { type: UPDATE_CHARACTER_REQUEST };
}
export function updateCharacterSuccess(payload) {
  return { type: UPDATE_CHARACTER_SUCCESS, payload }
}
export function updateCharacterFailure(error) {
  return { type: UPDATE_CHARACTER_FAILURE, error }
}

export function updateCharacter(character) {
  return (dispatch, getState) => {
    dispatch(updateCharacterRequest());

    // Remove id from character to allow update
    const endpoint = getState().app.ruleset;
    const body = { ...character }
    body._id = undefined;
    return fetchEndpoint(`${endpoint}/characters/${character._id}`, 'put', body)
      .then(payload => {
        dispatch(updateCharacterSuccess(payload));
      })
      .catch(err => {
        dispatch(updateCharacterFailure(err));
      });
  }
}
