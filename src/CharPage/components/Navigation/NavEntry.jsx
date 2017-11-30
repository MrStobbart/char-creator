import React from 'react';

export function NavEntry(props) {
  return (
    <li>
      <a href={`#${props.fieldset.id}`} uk-scroll="true">
        {props.fieldset.title}
      </a>
    </li>
  )
}