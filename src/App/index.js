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
          <nav cuk-navbar="true" className="uk-navbar-container">
            <div className="uk-navbar-center">  
              <ul className="uk-navbar-nav">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/charpage/savageworlds">Savage Worlds</Link></li>
                <li><Link to="/charpage/thedarkeye">Das Schwarze Auge</Link></li>
              </ul>
            </div>  
          </nav>
        </header>
        <main className="uk-container uk-container-expand	">
          <Route path="/home" component={Home} /> 
          <Route path="/charpage/:endpoint" component={CharPageContainer}/>
        </main>
      </div>
    );
  }
}

export default App;
