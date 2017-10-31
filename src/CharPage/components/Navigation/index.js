import React from 'react';
import { NavEntry } from './NavEntry';

export function Navigation(props) {
  console.log('char page nav props', props)
  const fieldsets = props.fieldsets.map(fieldset => <NavEntry key={fieldset.id} fieldset={fieldset} />)
  
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