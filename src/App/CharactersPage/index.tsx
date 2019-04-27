import { Link } from 'react-router-dom';
import { deleteCharacter, fetchCharacters } from '../actions';
import { CharacterTile } from './CharacterTile';
import React, { useEffect } from 'react';
import { useAppState } from '../appStateHook';

export interface CharactersPageProps {}

export default function CharactersPage(props: CharactersPageProps) {
  const [appState, dispatch] = useAppState();
  const numberOfCharacters = appState.characters.length;
  useEffect(() => {
    if (numberOfCharacters === 0) {
      fetchCharacters(dispatch, appState);
    }
    // TODO Does this work with length?
  }, [numberOfCharacters]);

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
