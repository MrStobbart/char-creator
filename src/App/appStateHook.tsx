import React, { createContext, Dispatch, useContext, FunctionComponent } from 'react';
import { useReducer } from 'reinspect';
import { AppState, AppAction, initialState, appReducer } from './reducer';

type AppContext = [AppState, Dispatch<AppAction>];

const AppContext = createContext<AppContext>([initialState, () => {}]);

function init(initialState: AppState) {
  return initialState;
}

export const StateProvider: FunctionComponent = props => {
  return (
    <AppContext.Provider value={useReducer(appReducer, initialState, init, 'AppState')}>
      {props.children}
    </AppContext.Provider>
  );
};
export const useAppState = () => useContext(AppContext);
