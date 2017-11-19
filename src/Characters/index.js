import React from 'react';

import { Link } from 'react-router-dom';
import './index.css';


export default function CharactersPage(props) {
  
  return (
    <div uk-grid="true">
      <div className="uk-width-1-6">
        <Link to="/charpage">
          <div
            className="uk-card uk-card-body uk-card-default uk-card-hover">
            <h3 className="uk-card-title">Marek Meyer</h3>
            <div>Some basic informations</div>
          </div>
        </Link>
      </div>  
    </div>
  )
}
