import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CharPageContainer from '../CharPage';
import Home from '../Home';
import Navbar from './components/Navbar';
import CharactersPage from '../Characters';

import {
  fetchCharacters,
  fetchCharSheet
} from './actions';

import './index.css';

class App extends Component {

  componentDidMount() {
    this.props.fetchCharSheet();
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
          <Route path="/charpage/:characterId" component={CharPageContainer}/>
          <Route path="/charpage" component={CharPageContainer}/>
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

function mapStateToProps(state) {
  return {
    ...state,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchCharSheet: () => { dispatch(fetchCharSheet()) },
    fetchCharacters: () => { dispatch(fetchCharacters()) },
  }
}



