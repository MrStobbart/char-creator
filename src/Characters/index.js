import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCharacter } from '../App/actions';
import { DeleteCharacterButton } from './components/DeleteCharacterButton/index';



class CharactersPage extends React.Component{

  render() {
    return (
      <div uk-grid="true">
        {this.props.characters.map(character => (
          <div className="uk-width-1-6" key={character._id}>
            <Link to={`/charpage/${character._id}`} className="uk-position-z-index">
              <div
                className="uk-card uk-card-body uk-card-default uk-card-hover">
                <div className="uk-card-badge">
                  <DeleteCharacterButton characterId={character._id} deleteCharacter={this.props.deleteCharacter}/> 
                </div>
                <h4>{character.generalInformation.name !== '' ? character.generalInformation.name : 'Namenlos'}</h4>
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
export default connect(mapStateToProps, mapDispatchToProps)(CharactersPage)

function mapStateToProps(state) {
  return {
    characters: state.app.characters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteCharacter: characterId => {dispatch(deleteCharacter(characterId))},
  }
}
