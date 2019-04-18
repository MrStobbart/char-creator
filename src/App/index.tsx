import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateCharacter from './CreateCharacterPage';
import HomePage from './HomePage';
import Navbar from './Navbar';
import CharactersPage from './CharactersPage';

import { Store } from '../rootReducer';

import './index.css';

export interface AppProps extends PropsFromState, PropsFromDispatch {}

class App extends React.Component<AppProps> {
  componentDidMount() {
    // this.props.fetchCharacters();
  }

  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <main className='uk-container uk-container-expand' style={{ marginTop: 12 }}>
          <Route path='/home' component={HomePage} />
          <Route path='/charpage/:characterId?' component={CreateCharacter} />
          <Route path='/characters' component={CharactersPage} />
        </main>
      </div>
    );
  }
}

/**
 * CharPageContainer
 */
export default connect<PropsFromState, PropsFromDispatch, void>(
  mapStateToProps,
  mapDispatchToProps
)(App);

interface PropsFromState extends Store {}
interface PropsFromDispatch {}

function mapStateToProps(state: Store): PropsFromState {
  return {
    ...state,
  };
}
function mapDispatchToProps(dispatch: Function): PropsFromDispatch {
  return {
    // fetchCharacters: () => { dispatch(fetchCharacters()) },
  };
}
