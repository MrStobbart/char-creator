import React from 'react';
import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { CalcField } from './CalcField';
import './Fieldset.css';

export function Fieldset(props) {
  const fields = props.fieldset.fields.map(field => {
    switch (field.type) {
      case 'number':
        return (
          <NumberField
            key={field.id}
            values={props.meta.defaultValues}
            default={field.default ? field.default : 0}
            updateValue={props.createUpdateValueFunction(field.id)}
          >
            {field.label}
          </NumberField>
        );
      case 'calculated':
        return (
          <CalcField
            key={field.id}
            charSheetData={props.charSheetData}
            calculation={field.calculation}
            modifier={props.charSheetData.id}
          >
            {field.label}
          </CalcField>
        );
      default:
        return (
          <TextField
            key={field.id}
            type={field.type ? field.type : "text"}
            updateValue={props.createUpdateValueFunction(field.id)}
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