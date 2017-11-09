import React from 'react';
import PropTypes from 'prop-types';
import './TextField.css';

export function TextField(props) {
  return (
    <div className="column-group quarter-gutters">
      <label className="all-40 align-left" htmlFor="name">{props.children}</label>
      <div className="control all-60">
        <input
          className="text"
          type="text"
          name="name"
        />
      </div>
    </div>
  )
}

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}