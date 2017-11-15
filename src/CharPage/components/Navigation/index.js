import React from 'react';
import { NavEntry } from './NavEntry';

export function Navigation(props) {
  let fieldsets = '';
  if (props.fieldsets) {
    fieldsets = props.fieldsets.map(fieldset => <NavEntry key={fieldset.id} fieldset={fieldset} />)
  }
  
  return (
    <div uk-sticky="offset: 20">
      <ul className="uk-nav uk-nav-default">
        {fieldsets}
      </ul>
    </div>
  );
}