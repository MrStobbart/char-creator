import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCharacters, deleteCharacter } from './actions';



import './index.css';


class CharactersPage extends React.Component{

  componentDidMount() {
    this.props.fetchCharacters();
  }
  
  render() {
    console.log('characters props', this.props);
    return (
      <div uk-grid="true">
        {this.props.characters.map(character => (
          <div className="uk-width-1-6" key={character._id}>
            <Link to={`/charpage/${character._id}`}>
              <div
                className="uk-card uk-card-body uk-card-default uk-card-hover">
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
  console.log('this is the state', state);
  return {
    characters: state.charactersPage.characters
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchCharacters: () => { dispatch(fetchCharacters()) },
    deleteCharacter: (character) => { dispatch(deleteCharacter(character)) },
  }
}
