import React from 'react';
import { Link } from 'react-router-dom';


export function Navbar(props) {
  
  return (
    <div>
      <nav uk-navbar="true" className="uk-navbar-container">
        <div className="uk-navbar-center">
          <ul className="uk-navbar-nav">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/charpage/savageworlds">Savage Worlds</Link></li>
            <li><Link to="/charpage/thedarkeye">Das Schwarze Auge</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}