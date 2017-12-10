import React from 'react';
import { TextField } from './fields/TextField';
import { NumberField } from './fields/NumberField';
import { DataField } from './fields/DataField';
import { AddableField } from './fields/AddableField';

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
        return (
          <AddableField
            key={field.id}
            values={props.fieldset.fields[0].selected}
            addField={props.createAddAddableField(props.fieldset.id)}
            updateValue={props.createUpdateAddableField(props.fieldset.id)}
            removeField={props.createRemoveAddableField(props.fieldset.id)}
            field={field}
          >
            Addable field
          </AddableField>
        )  
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
    <fieldset id={props.fieldset.id} style={{ padding: '1em 2em 1em', borderWidth: 1 }}>
      <legend style={{ fontSize: '1.2em' }}>{props.fieldset.title}</legend>
      <div uk-grid="true">
        {fields}
      </div>
    </fieldset>
  )
}