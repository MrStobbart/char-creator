import { fetchEndpoint } from '../utils/fetchEndpoint';

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
    const endpoint = getState().charPage.ruleset;
    console.log('Huhuhu');
    return fetchEndpoint(endpoint)
      .then(payload => {
        console.log('payload:', payload)
        dispatch(fetchSheetSuccess(payload));
      })
      .catch(err => {
        dispatch(fetchSheetFailure(err));
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

export function createCharacter( character) {
  return (dispatch, getState) => {
    dispatch(createCharacterRequest());
    const endpoint = getState().charPage.ruleset;
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
    const endpoint = getState().charPage.ruleset;
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

