import React from 'react';
import './TextField.css';


export function TextField(props){
  
  const handleChange = (event) => {
    props.updateValue(event.target.value)
  }

  return (
    <div className="">
      <label className="uk-form-label" htmlFor="name">{props.children}</label>
      <div className="uk-form-controls">
        <input
          className="text-field uk-input uk-form-small"
          type="text"
          value={props.value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

