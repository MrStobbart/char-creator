import React from 'react';
import { Field } from './Field';

export function Fieldset(props) {
  const fields = props.fieldset.fields.map(field => (
    <Field
      key={field.id}
      type={field.type ? field.type : 'text'}
    >
      {field.label}
    </Field>
  ));

  return (
    <fieldset id={props.fieldset.id}>
      <legend>{props.fieldset.title}</legend>
      <div className="column-group quarter-gutters">
        {fields}
      </div>
    </fieldset>
  )
}