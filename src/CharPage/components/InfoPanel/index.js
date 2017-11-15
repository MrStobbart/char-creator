import React from 'react';

import { CharHeader } from './CharHeader';


export function InfoPanel(props) {
  return (
    <div>
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