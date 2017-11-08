import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { CharPageContainer } from '../CharPage';
import { Home } from '../Home';

import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/charpage/savageworlds">Savage Worlds</Link>
          <Link to="/charpage/thedarkeye">Das Schwarze Auge</Link>
        </header>
        <main>
          <Route path="/" component={Home} /> 
          <Route path="/charpage/:endpoint" component={CharPageContainer}/>
        </main>
      </div>
    );
  }
}

export default App;
