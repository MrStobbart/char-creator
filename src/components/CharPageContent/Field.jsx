import React from 'react';

export function Field(props) {
  return (
    <div className="column-group quarter-gutters">
      <label className="all-40 align-left" htmlFor="name">{props.children}</label>
      <div className="control all-60">
        <input type="text" name="name" value="" />
      </div>
    </div>
  )
}