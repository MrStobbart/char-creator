import React from 'react';

export function CharPageNavEntry(props) {
  return (
    <li>
      <a href={`#${props.fieldset.name}`} className="ink-smooth-scroll">
        {props.fieldset.title}
      </a>
    </li>
  )
}