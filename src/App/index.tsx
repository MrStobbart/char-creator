import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateCharacter from './CreateCharacterPage';
import HomePage from './HomePage';
import Navbar from './Navbar';
import CharactersPage from './CharactersPage';

import { Store } from '../rootReducer';


import './index.css';

export interface Props{
  // fetchCharacters: Function
}

class App extends React.Component<Props> {

  componentDidMount() {
    // this.props.fetchCharacters();
  }

  render() {
    return (
      <div>
        <header>
          <Navbar/>
        </header>
        <main className="uk-container uk-container-expand" style={{marginTop: 12}}>
          <Route path="/home" component={HomePage} /> 
          <Route path="/charpage/:characterId?" component={CreateCharacter}/>
          <Route path="/characters" component={CharactersPage}/>
        </main>
      </div>
    );
  }
}


/**
 * CharPageContainer
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)

function mapStateToProps(state: Store) {
  return {
    ...state,
  }
}
function mapDispatchToProps(dispatch: Function) {
  return {
    // fetchCharacters: () => { dispatch(fetchCharacters()) },
  }
}



