import React from 'react';
import { NavEntry } from './NavEntry';

export function Navigation(props) {
  let fieldsets = '';
  if (props.fieldsets) {
    fieldsets = props.fieldsets.map(fieldset => <NavEntry key={fieldset.id} fieldset={fieldset} />)
  }
  
  return (
    <div className="xlarge-15 large-20 medium-25 hide-small hide-tiny">
      <nav className="ink-navigation ink-sticky">
        <ul className="menu vertical orange">
          {fieldsets}
        </ul>
      </nav>
    </div>
  );
}