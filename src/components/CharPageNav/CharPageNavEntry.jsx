import React from 'react';

export function CharPageNavEntry(props) {
  return (
    <li>
      <a href={props.field.name} className="ink-smooth-scroll">
        {props.field.title}
      </a>
    </li>
  )
}