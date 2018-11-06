import * as React from 'react';
import { NavEntry } from './NavEntry';
import { FieldGroup } from 'src/interfaces';

export interface Props{
  fieldsets: FieldGroup[]
}

export function Navigation(props: Props) {
  const fieldsets = props.fieldsets.map(fieldset => <NavEntry key={fieldset.id} fieldset={fieldset} />)
  
  return (
    <div uk-sticky="offset: 20" className="uk-card uk-card-default uk-card-body">
      <ul className="uk-nav uk-nav-default">
        {fieldsets}
      </ul>
    </div>
  );
}