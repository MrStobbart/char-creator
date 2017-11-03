import { fetchEndpoint } from '../utils/fetchEndpoint';

export const FETCH_SHEET_REQUEST = 'FETCH_SHEET_REQUEST';
export const FETCH_SHEET_SUCCESS = 'FETCH_SHEET_SUCCESS';
export const FETCH_SHEET_FAILURE = 'FETCH_SHEET_FAILURE';

export function fetchCharSheetRequest() {
  return {
    type: FETCH_SHEET_REQUEST,
  };
}

export function fetchCharSheetSuccess(charSheet) {
  return {
    type: FETCH_SHEET_SUCCESS,
    charSheet
  }
}

export function fetchCharSheetFailure(err) {
  return {
    type: FETCH_SHEET_FAILURE,
    err
  }
}

export function fetchCharPageByEndpoint(endpoint) {
  return dispatch => {
    dispatch(fetchCharSheetRequest());

    return fetchEndpoint(endpoint)
      .then(charSheet => {
        dispatch(fetchCharSheetSuccess(charSheet));
      })
      .catch(err => {
        dispatch(fetchCharSheetFailure(err));
      });
  }
}