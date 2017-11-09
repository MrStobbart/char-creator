import React from 'react';
import { TextField } from './TextField';
import { BoxField } from './BoxField';
import './Fieldset.css';

export function Fieldset(props) {
  const fields = props.fieldset.fields.map(field => {
    switch (field.style) {
      case "box":
        return (
          <BoxField
            key={field.id}
            values={props.meta.defaultValues}
            default={field.default ? field.default : 0}
          >
            {field.label}
          </BoxField>
        );
      default:
        return (
          <TextField
            key={field.id}
            type={field.type ? field.type : "text"}
          >
            {field.label}
          </TextField>
        )
    }

    
  });

  return (
    <fieldset id={props.fieldset.id}>
      <legend>{props.fieldset.title}</legend>
      <div className="column-group quarter-gutters">
        {fields}
      </div>
    </fieldset>
  )
}