import React from 'react';
import { CharPageContentFieldset } from './CharPageContentFieldset';

export function CharPageContent(props) {
  const fieldsets = props.sheet.map(fieldset => <CharPageContentFieldset key={fieldset.name} fieldset={fieldset}/>);
  return (
    <div class="xlarge-80 large-80 medium-70 small-100 tiny-100">
      <form>
        {fieldsets}
      </form>
    </div>
  )
}