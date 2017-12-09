import React from 'react';
import { TextField } from './fields/TextField';
import { NumberField } from './fields/NumberField';
import {DataField} from './fields/DataField';
import { AddableField } from './fields/AddableField';
import './Fieldset.css';

export function Fieldset(props) {
  const fields = props.fieldset.fields.map(field => {
    switch (field.type) {
      case 'number':
        return (
          <NumberField
            key={field.id}
            value={props.getValue(field.id)}
            values={props.availableValues}
            updateValue={props.createSetValue(field)}
            field={field}
          >
            {field.label}
          </NumberField>
        );
      case 'calculated':
        return (
          <DataField
            key={field.id}
            value={props.getValue(field.id)}
          >
            {field.label}
          </DataField>
        );
      case 'addable':
        // return (
        // <AddableField
        //   key={field.id}
        //   values={props.charData[props.fieldset.id][field.id]}
        //   updateValue={props.createUpdateAddableField(field)}
        //   removeField={props.createRemoveAddableField(field)}
        //   addField={props.createAddAddableField(field)}
        //   field={field}
        // >
        //   Addable field
        // </AddableField>
        // )  
        break;
      default:
        return (
          <TextField
            key={field.id}
            value={props.getValue(field.id)}
            updateValue={props.createSetValue(field)}
          >
            {field.label}
          </TextField>
        )
    }
  });

  return (
    <fieldset id={props.fieldset.id}>
      <legend>{props.fieldset.title}</legend>
      <div uk-grid="true">
        {fields}
      </div>
    </fieldset>
  )
}