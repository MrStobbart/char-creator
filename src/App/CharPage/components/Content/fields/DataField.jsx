/* eslint no-eval: 0 */
import React from 'react';

export function DataField (props) {

    return (
      <div className="">
        <label className="uk-form-label" htmlFor="name">{props.children}</label>
        <div className="uk-form-controls">
          <input
            className="number-field uk-input uk-form-small"
            value={props.value}
            readOnly
          />
        </div>
      </div>
    )
}
