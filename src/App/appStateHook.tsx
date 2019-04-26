import React, { createContext, useReducer, Dispatch, useContext, FunctionComponent } from 'react';
import { AppState, AppAction, initialState, appReducer } from './reducer';

type AppContext = [AppState, Dispatch<AppAction>];

const AppContext = createContext<AppContext>([initialState, () => {}]);

export const StateProvider: FunctionComponent = props => (
  <AppContext.Provider value={useReducer(appReducer, initialState)}>
    {props.children}
  </AppContext.Provider>
);
export const useAppState = () => useContext(AppContext);
