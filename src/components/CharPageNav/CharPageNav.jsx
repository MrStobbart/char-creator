import React from 'react';
import { CharPageNavEntry } from './CharPageNavEntry';

export function CharPageNav(props) {
  const fieldsets = props.fieldsets.map(fieldset => <CharPageNavEntry key={fieldset.name} fieldset={fieldset}/>)
  return (
    <div className="xlarge-20 large-20 medium-30 hide-small hide-tiny">
      <nav className="ink-navigation ink-sticky">
        <ul className="menu vertical grey">
          {fieldsets}
        </ul>
      </nav>
    </div>
  );
}