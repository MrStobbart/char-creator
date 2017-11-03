import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { CharPageContainer } from '../CharPage';

import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/charpage">Charpage</Link>
        </header>
        <main>
          <Route exact path="/" component="" /> 
          <Route exact path="/charpage" component={CharPageContainer} />
        </main>
      </div>
    );
  }
}

export default App;
