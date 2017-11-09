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
          <nav class="ink-navigation">
            <ul class="menu horizontal black">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/charpage/savageworlds">Savage Worlds</Link></li>
              <li><Link to="/charpage/thedarkeye">Das Schwarze Auge</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Route path="/home" component={Home} /> 
          <Route path="/charpage/:endpoint" component={CharPageContainer}/>
        </main>
      </div>
    );
  }
}

export default App;
