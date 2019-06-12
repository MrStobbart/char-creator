import * as React from 'react';
import { TextField } from './fields/TextField';
import { NumberField } from './fields/NumberField';
import { DataField } from './fields/DataField';
import { AddableField } from './fields/AddableField';
import { FieldGroup, NumberProperty, DeliveredData, TextProperty, Quality, Property } from '../../../models/interfaces';
import { CreateUpdateValue, AddQuality, RemoveQuality } from '../../interfaces';
import SavageWorldsCharacter from '../../../models/savageWorldsCharacter';
import { Qualities } from '../../../models/Qualities';

export interface FieldGroupContainerProps {
  character: SavageWorldsCharacter;
  fieldset: FieldGroup;
  availableValues: string[];
  createUpdateValue: CreateUpdateValue<Property>;
  addQuality: AddQuality;
  removeQuality: RemoveQuality;
}

export function FieldGroupComponent(props: FieldGroupContainerProps) {
  var fields: any;
  switch (props.fieldset.type) {
    case 'number':
      fields = props.fieldset.order.map(propertyId => {
        const property: NumberProperty = props.character[propertyId];
        return (
          <NumberField
            key={property.id}
            value={property.value}
            availableValues={props.availableValues}
            updateValue={props.createUpdateValue(propertyId)}
            default={property.default}
          >
            {property.label}
          </NumberField>
        );
      });
      break;
    case 'readonly':
      fields = props.fieldset.order.map(propertyId => {
        const property: DeliveredData = props.character[propertyId];
        return (
          <DataField key={property.id} value={property.value}>
            {property.label}
          </DataField>
        );
      });
      break;
    case 'text':
      fields = props.fieldset.order.map(propertyId => {
        const property: TextProperty = props.character[propertyId];
        return (
          <TextField key={property.id} value={property.value} updateValue={props.createUpdateValue(propertyId)}>
            {property.label}
          </TextField>
        );
      });
      break;
    case 'addable':
      fields = props.fieldset.order.map(propertyId => {
        const qualities: Qualities<Quality> = props.character[propertyId];
        return (
          <AddableField
            key={propertyId}
            qualityId={propertyId}
            qualities={qualities}
            addQuality={props.addQuality}
            removeQuality={props.removeQuality}
          />
        );
      });
      break;
    default:
      break;
  }

  return (
    <fieldset id={props.fieldset.id} style={{ padding: '1em 2em 1em', borderWidth: 1 }}>
      <legend style={{ fontSize: '1.2em' }}>{props.fieldset.title}</legend>
      <div uk-grid="true">{fields}</div>
    </fieldset>
  );
}
