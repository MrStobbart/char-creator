/* eslint no-eval: 0 */
import * as React from 'react';

export interface DataFieldProps {
  children: string;
  value: number;
}
export function DataField(props: DataFieldProps) {
  return (
    <div className="">
      <label className="uk-form-label" htmlFor="name">
        {props.children}
      </label>
      <div className="uk-form-controls">
        <input className="number-field uk-input uk-form-small" value={props.value} readOnly />
      </div>
    </div>
  );
}
