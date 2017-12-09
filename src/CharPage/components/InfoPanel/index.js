import React from 'react';

import { DisplayField } from './DisplayField';


export function InfoPanel(props) {
  return (
    <div uk-sticky="offset: 20" className="uk-card uk-card-default uk-card-body">
      {props.character.charCreationInformation.map(info => <DisplayField value={info.value}>{info.label}</DisplayField>)}
      <div className="uk-margin">
        <button className="uk-button uk-button-default uk-button-small" onClick={props.saveChanges}>
          {props.unsavedChanges ? 'Unsaved changes' : 'Everything saved'}
        </button>
      </div>
      <div className="uk-margin">
        <button className="uk-button uk-button-default uk-button-small">
          Finish char creation
      </button>
      </div>
    </div>
  )
}