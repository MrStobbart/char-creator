import React from 'react';
import { Fieldset } from './Fieldset';
import './index.css';

export function Content(props) {

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <form className="uk-form-horizontal">
        {props.character.fieldsets.map(fieldset =>
          <Fieldset
            key={fieldset.id}
            fieldset={fieldset}
            availableValues={props.availableValues}
            createSetValue={props.makeCreateSetValue(fieldset.id)}
            getValue={props.createGetValue(fieldset.id)}
          />
        )}
      </form>
    </div>
  )
  
}