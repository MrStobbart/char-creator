import React from 'react';

export function CharPageContentFieldset(props) {
  const fields = props.fieldset.fields.map(field => <input type="text" name={field.label}/>)
  return (
    <fieldset id={props.fieldset.name}>
      <legend>{props.fieldset.title}</legend>
      <div className="column-group quarter-gutters">
        {fields}
      </div>
    </fieldset>
  )
}