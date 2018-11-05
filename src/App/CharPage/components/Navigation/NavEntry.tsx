import * as React from 'react';
import { Fieldset } from 'src/interfaces';

export interface Props{
  fieldset: Fieldset
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