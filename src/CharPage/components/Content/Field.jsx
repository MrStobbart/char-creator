import React from 'react';
import PropTypes from 'prop-types';
import './Field.css';

export function Field(props) {
  return (
    <div className="column-group quarter-gutters">
      <label className="all-40 align-left" htmlFor="name">{props.children}</label>
      <div className="control all-60">
        <input className={props.type} type="text" name="name" />
      </div>
    </div>
  )
}

Field.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}