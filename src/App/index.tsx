import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CharPageContainer from './CharPage';
import Home from './Home';
import Navbar from './Navbar';
import CharactersPage from './Characters';

import { fetchCharacters } from './actions';
import { Store } from '../rootReducer';


import './index.css';

export interface Props{
  fetchCharacters: Function
}

class App extends React.Component<Props> {

  componentDidMount() {
    this.props.fetchCharacters();
  }

  render() {
    return (
      <div>
        <header>
          <Navbar/>
        </header>
        <main className="uk-container uk-container-expand" style={{marginTop: 12}}>
          <Route path="/home" component={Home} /> 
          <Route path="/charpage/:characterId?" component={CharPageContainer}/>
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
    fetchCharacters: () => { dispatch(fetchCharacters()) },
  }
}



