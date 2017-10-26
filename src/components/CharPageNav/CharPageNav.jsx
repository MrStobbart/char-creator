import React from 'react';
import { CharPageNavEntry } from './CharPageNavEntry';

export function CharPageNav(props) {
  const navFields = props.fields.map(field => <CharPageNavEntry key={field.name} field={field}/>)
  return (
    <div className="xlarge-20 large-20 medium-30 hide-small hide-tiny">
      <nav className="ink-navigation ink-sticky">
        <ul className="menu vertical grey">
          {navFields}
        </ul>
      </nav>
    </div>
  );
}