import React from 'react';
import { Fieldset } from './Fieldset';
import './index.css';

export function Content(props) {

  console.log('props', props)

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <form className="uk-form-horizontal">
        {props.charSheet.fieldsets.map(fieldset =>
          <Fieldset
            key={fieldset.id}
            fieldset={fieldset}
            meta={props.charSheet.meta}
            createUpdateValueFunction={props.makeCreateUpdateValueFunction(fieldset.id)}
            charSheetData={props.charSheetData}
          />
        )}
      </form>
    </div>
  )
  
}