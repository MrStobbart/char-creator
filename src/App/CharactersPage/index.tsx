import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCharacter, fetchCharacters } from '../actions';
import { DeleteCharacterButton } from './DeleteCharacterButton';
import { Store } from '../../rootReducer';
import { AppAction } from '../interfaces';
import { ThunkDispatch } from 'redux-thunk';
import Character from '../../models/savageWorldsCharacter';
import { CharacterTile } from './CharacterTile';

export interface CharactersPageProps extends PropsFromState, PropsFromDispatch { }

class CharactersPage extends React.Component<CharactersPageProps>{

  componentDidMount() {
    if (this.props.characters.length === 0) {
      this.props.fetchCharacters()
    }
  }

  render() {
    console.log('characters in characters page', this.props.characters);

    return (
      <div uk-grid="true">
        {this.props.characters.map(character => (
          <CharacterTile
            key={character.id}
            character={character}
            deleteCharacter={this.props.deleteCharacter}
          />
        ))}
        <div className="uk-width-1-6">
          <Link to={`/charpage`}>
            <div
              className="uk-card uk-card-body uk-card-default uk-card-hover">
              <h4>Neuer Charakter</h4>
              <div>Erstelle einen neuen Character</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}


/**
 * CharactersPageContainer
 */
export default connect<PropsFromState, PropsFromDispatch, void>(mapStateToProps, mapDispatchToProps)(CharactersPage)

interface PropsFromState { characters: Character[] }
interface PropsFromDispatch {
  deleteCharacter: (characterId: string) => void,
  fetchCharacters: () => void
}

function mapStateToProps(state: Store): PropsFromState {
  return {
    characters: state.app.characters
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<Store, any, AppAction>): PropsFromDispatch {
  return {
    deleteCharacter: (characterId: string) => dispatch(deleteCharacter(characterId)),
    fetchCharacters: () => dispatch(fetchCharacters())
  }
}
