import React from 'react';
import { TextField } from './fields/TextField';
import { NumberField } from './fields/NumberField';
import { CalcField } from './fields/CalcField';
import { AddableField } from './fields/AddableField';
import './Fieldset.css';

export function Fieldset(props) {
  const fields = props.fieldset.fields.map(field => {
    switch (field.type) {
      case 'number':
        return (
          <NumberField
            key={field.id}
            value={props.charData[props.fieldset.id][field.id].value}
            values={props.meta.availableValues}
            calculationTypes={props.meta.calculationTypes}
            updateValue={props.createUpdateNumberField(field)}
            field={field}
          >
            {field.label}
          </NumberField>
        );
      case 'calculated':
        return (
          <CalcField
            key={field.id}
            value={props.charData[props.fieldset.id][field.id]}
            charData={props.charData}
            calculation={field.calculation}
          >
            {field.label}
          </CalcField>
        );
      case 'addable':
        return (
          <AddableField
            key={field.id}
            values={props.charData[props.fieldset.id][field.id]}
            updateValue={props.createUpdateAddableField(field)}
            removeField={props.createRemoveAddableField(field)}
            addField={props.createAddAddableField(field)}
            field={field}
          >
            Addable field
          </AddableField>
        )  
      default:
        return (
          <TextField
            key={field.id}
            value={props.charData[props.fieldset.id][field.id]}
            updateValue={props.createUpdateInformationField(field)}
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