import React from 'react';

export function NavEntry(props) {
  return (
    <li>
      <a href={`#${props.fieldset.id}`} className="ink-smooth-scroll">
        {props.fieldset.title}
      </a>
    </li>
  )
}