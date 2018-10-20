import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  
  return (
    <div>
      <nav uk-navbar="true" className="uk-navbar-container">
        <div className="uk-navbar-center">
          <ul className="uk-navbar-nav">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/charpage">Create Character</Link></li>
            <li><Link to="/characters">View Characters</Link></li>
            <li><Link to="/home">Switch Ruleset</Link></li>
            <li><Link to="/home">Login</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}