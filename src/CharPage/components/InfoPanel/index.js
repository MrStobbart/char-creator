import React from 'react';

import { CharHeader } from './CharHeader';


export function InfoPanel(props) {
  return (
    <div uk-sticky="offset: 20" className="uk-card uk-card-default uk-card-body">
      <CharHeader
        charSheetData={props.charSheetData}
        meta={props.meta}
        charSheetId={props.charSheetId}
        saveChanges={props.saveChanges}
        unsavedChanges={props.unsavedChanges}
      />
    </div>
  )
}