import React from 'react';

export function TextField(props){
  
  const handleChange = (event) => {
    props.updateValue(event.target.value)
  }

  const style = {
    borderStyle: 'none',
    borderColor: '#666',
    borderBottomStyle: 'solid',
    borderWidth: 1,
  }

  return (
    <div className="">
      <label className="uk-form-label" htmlFor="name">{props.children}</label>
      <div className="uk-form-controls">
        <input
          className="uk-input uk-form-small"
          style={style}
          type="text"
          value={props.value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

