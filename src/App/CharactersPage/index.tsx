import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCharacter, fetchCharacters } from '../actions';
import { DeleteCharacterButton } from './DeleteCharacterButton';
import { AppAction } from '../interfaces';
import { ThunkDispatch } from 'redux-thunk';
import Character from '../../models/savageWorldsCharacter';
import { CharacterTile } from './CharacterTile';
import React, { useEffect } from 'react';
import { useAppState } from '../appStateHook';

export interface CharactersPageProps {}

export default function CharactersPage(props: CharactersPageProps) {
  const [appState, dispatch] = useAppState();
  useEffect(() => {
    if (appState.characters.length === 0) {
      fetchCharacters(dispatch, appState);
    }
    // TODO Does this work with length?
  }, [appState.characters.length]);

  const createDeleteCharacter = (characterId: string) => () => {
    console.log('Delete characteer');

    deleteCharacter(dispatch, appState, characterId);
  };

  return (
    <div uk-grid='true'>
      {appState.characters.map(character => (
        <CharacterTile
          key={character.id}
          character={character}
          deleteCharacter={createDeleteCharacter(character.id)}
        />
      ))}
      <div className='uk-width-1-6'>
        <Link to={`/charpage`}>
          <div className='uk-card uk-card-body uk-card-default uk-card-hover'>
            <h4>Neuer Charakter</h4>
            <div>Erstelle einen neuen Character</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
