import * as React from 'react';
import { FieldGroup } from 'src/interfaces';

export interface Props{
  fieldset: FieldGroup
}

export function NavEntry(props: Props) {
  return (
    <li>
      <a href={`#${props.fieldset.id}`} uk-scroll="true">
        {props.fieldset.title}
      </a>
    </li>
  )
}