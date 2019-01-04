import * as React from 'react';

import { DisplayField } from './DisplayField';
import SavageWorldsCharacter from 'src/models/savageWorldsCharacter';
import { NumberProperty } from 'src/models/interfaces';
import { SaveChanges } from 'src/App/interfaces';

export interface InfoPanelProps {
  character: SavageWorldsCharacter,
  unsavedChanges: boolean,
  saveChanges: SaveChanges
}

export function InfoPanel(props: InfoPanelProps) {
  return (
    <div uk-sticky="offset: 20" className="uk-card uk-card-default uk-card-body">
      {props.character.charCreationInformation.order.map(propertyId => {
        const property: NumberProperty = props.character[propertyId]
        return (
          <DisplayField
            key={property.id}
            value={property.value}
          >
            {property.label}
          </DisplayField>)
      }
      )}
      <div className="uk-margin">
        <button
          className="uk-button uk-button-default uk-button-small"
          onClick={props.saveChanges}
          // TODO proper color here
          style={{ background: props.unsavedChanges ? 'red' : 'green' }}
        >
          {props.unsavedChanges ? 'Unsaved changes' : 'Everything saved'}
        </button>
      </div>
      <div className="uk-margin">
        <button className="uk-button uk-button-default uk-button-small">
          Finish char creation
        </button>
      </div>
    </div >
  )
}