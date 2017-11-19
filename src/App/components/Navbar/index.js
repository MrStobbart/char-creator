import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  
  return (
    <div>
      <nav uk-navbar="true" className="uk-navbar-container">
        <div className="uk-navbar-center">
          <ul className="uk-navbar-nav">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/charpage/savageworldsfantasy">Create Character</Link></li>
            {/* <li><Link to="/charpage/thedarkeye">Das Schwarze Auge</Link></li> */}
          </ul>
        </div>
      </nav>
    </div>
  )
}