import * as React from 'react';
import { Link } from 'react-router-dom';
import Character from '../../models/savageWorldsCharacter';
import { DeleteCharacterButton } from './DeleteCharacterButton';
import { CharacterName } from './CharacterName';
import { CharacterInformation } from './CharacterInformation';

interface CharacterTileProps {
  character: Character;
  deleteCharacter: () => void;
}
export function CharacterTile(props: CharacterTileProps) {
  const character = props.character;
  return (
    <div className='uk-width-1-6' key={character.id}>
      <Link to={`/charpage/${character.id}`} className='uk-position-z-index'>
        <div className='uk-card uk-card-body uk-card-default uk-card-hover'>
          <div className='uk-card-badge'>
            <DeleteCharacterButton deleteCharacter={props.deleteCharacter} />
          </div>
          <CharacterName name={character.name.value} />
          <CharacterInformation />
        </div>
      </Link>
    </div>
  );
}
