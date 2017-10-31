import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { CharPage } from '../CharPage';

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
          <Route exact path="/charpage" component={CharPage} />
        </main>
      </div>
    );
  }
}

export default App;
