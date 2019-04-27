import { fetchEndpoint } from '../utils/fetchEndpoint';
import { QualityData, ApiResponse } from '../App/interfaces';
import Character from '../models/savageWorldsCharacter';
import { CharData } from '../models/interfaces';
import { Dispatch } from 'react';
import { AppState, AppAction } from './reducer';

export const fetchCharacters = async (dispatch: Dispatch<AppAction>, state: AppState) => {
  const endpoint = state.rules;
  try {
    // TODO change data to characters somewhere
    const response: ApiResponse = await fetchEndpoint(`${endpoint}/characters`);
    const payload: CharData[] = response.data;
    const timeName = 'Creating all character instances.';
    console.time(timeName);
    const characters = payload.map(characterData => new Character(characterData));
    console.timeEnd(timeName);
    return dispatch({ type: 'setCharacters', characters });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCharacter = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  characterId: string
) => {
  const endpoint = state.rules;
  try {
    await fetchEndpoint(`${endpoint}/characters/${characterId}`, 'delete');
    // TODO error handling here
    return dispatch({ type: 'deleteCharacter', id: characterId });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCharacter = async (
  dispatch: Dispatch<AppAction>,
  state: AppState,
  characterId: string
) => {
  const endpoint = state.rules;
  try {
    const response: ApiResponse = await fetchEndpoint(`${endpoint}/characters/${characterId}`);
    const characterData: CharData = response.data;
    const character = new Character(characterData);
    return dispatch({ type: 'upsertCharacter', character });
  } catch (error) {
    console.error(error);
  }
};

export const upsertCharacter = async (
  state: AppState,
  dispatch: Dispatch<AppAction>,
  character: Character
) => {
  const endpoint = state.rules;
  const body = character.getJson();
  console.log(body);
  try {
    await fetchEndpoint(`${endpoint}/characters/${character.id}`, 'put', body);
    return dispatch({ type: 'upsertCharacter', character });
  } catch (error) {
    console.error(error);
  }
};

export const fetchQualities = async (dispatch: Dispatch<AppAction>, state: AppState) => {
  const endpoint = state.rules;
  try {
    const response: ApiResponse = await fetchEndpoint(`${endpoint}/qualities`);
    const payload: QualityData = response.data;
    return dispatch({ type: 'setQualities', qualities: payload });
  } catch (error) {
    console.error(error);
  }
};
