import React from 'react';
import { Fieldset } from './Fieldset';
import './index.css';

export function Content(props) {

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <form className="uk-form-horizontal">
        {props.charSheet.fieldsets.map(fieldset =>
          <Fieldset
            key={fieldset.id}
            fieldset={fieldset}
            meta={props.charSheet.meta}
            charData={props.charData}
            createUpdateInformationField={props.makeCreateUpdateInformationField(fieldset.id)}
            createUpdateNumberField={props.makeCreateUpdateNumberField(fieldset.id)}
            createUpdateAddableField={props.makeCreateUpdateAddableField(fieldset.id)}
            createRemoveAddableField={props.makeCreateRemoveAddableField(fieldset.id)}
            createAddAddableField={props.makeCreateAddAddableField(fieldset.id)}
          />
        )}
      </form>
    </div>
  )
  
}