import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCharacter } from '../actions';
import { DeleteCharacterButton } from './DeleteCharacterButton';
import Character from '../../models/savageWorldsCharacter';
import { Store } from '../../rootReducer';
import { CharCreatorAction } from '../interfaces';
import { ThunkDispatch } from 'redux-thunk';

export interface CharactersPageProps extends PropsFromState, PropsFromDispatch{ }

class CharactersPage extends React.Component<CharactersPageProps>{

  render() {
    return (
      <div uk-grid="true">
        {this.props.characters.map(character => (
          <div className="uk-width-1-6" key={character.id}>
            <Link to={`/charpage/${character.id}`} className="uk-position-z-index">
              <div
                className="uk-card uk-card-body uk-card-default uk-card-hover">
                <div className="uk-card-badge">
                  <DeleteCharacterButton
                    characterId={character.id}
                    deleteCharacter={this.props.deleteCharacter}
                  /> 
                </div>
                <h4>{character.name.value !== '' ? character.name : 'Namenlos'}</h4>
                <div>Some basic informations</div>
              </div>
            </Link>
          </div>
        ))}
        <div className="uk-width-1-6">
          <Link to={`/charpage`}>
            <div
              className="uk-card uk-card-body uk-card-default uk-card-hover">
              <h4>Neuer Charakter</h4>
              <div>Some basic informations</div>
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
interface PropsFromDispatch { deleteCharacter: (characterId: string) => void }

function mapStateToProps(state: Store): PropsFromState {
  return {
    characters: state.app.characters
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<Store, any, CharCreatorAction>): PropsFromDispatch {
  return {
    deleteCharacter: (characterId: string) => dispatch(deleteCharacter(characterId)),
  }
}
