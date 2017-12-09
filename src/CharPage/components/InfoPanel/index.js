import React from 'react';

import { CharHeader } from './CharHeader';


export function InfoPanel(props) {
  return (
    <div uk-sticky="offset: 20" className="uk-card uk-card-default uk-card-body">
      <CharHeader
        character={props.character}
        saveChanges={props.saveChanges}
        unsavedChanges={props.unsavedChanges}
      />
    </div>
  )
}