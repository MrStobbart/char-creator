import React from 'react';
import { Route } from 'react-router-dom';

import CreateCharacter from './CreateCharacterPage';
import HomePage from './HomePage';
import Navbar from './Navbar';
import CharactersPage from './CharactersPage';

import './index.css';
import { StateProvider } from './appStateHook';

export interface AppProps {}
export default function App(props: AppProps) {
  return (
    <StateProvider>
      <header>
        <Navbar />
      </header>
      <main className="uk-container uk-container-expand" style={{ marginTop: 12 }}>
        <Route path="/home" component={HomePage} />
        <Route path="/charpage/:characterId?" component={CreateCharacter} />
        <Route path="/characters" component={CharactersPage} />
      </main>
    </StateProvider>
  );
}
