import React from 'react';
import './NumberField.css';



export function NumberField(props) {

  const decrease = (event) => {
    event.preventDefault();
    if (props.value === 0 || props.field.default === props.value) {
      return false
    }
    props.updateValue(props.value - 1)
  }

  const increase = (event) => {
    event.preventDefault();
    if (props.value + 1 >= props.values.length) {
      return false;
    }
    props.updateValue(props.value ? props.value + 1 : 1);
  }

  // console.log('fieldasd asxxasf sad ', props.field.id, props.value )
  return (
    <div>
      <label className="uk-form-label" htmlFor="name">{props.children}</label>
      <div className="uk-form-controls">
        <button className="uk-icon-button change-button" uk-icon="icon: minus; ratio: 0.7" onClick={decrease}></button>
        <input
          className="number-field uk-input uk-form-small"
          type="text"
          value={props.value ? props.values[props.value] : ''}
          readOnly
        />
        <button className="uk-icon-button change-button" uk-icon="icon: plus; ratio: 0.7" onClick={increase}></button>
      </div>
    </div>
  )
}