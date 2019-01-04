import * as React from 'react';

export interface CharacterNameProps {
  name: string
}
export function CharacterName(props: CharacterNameProps) {
  if (props.name === '') {
    return <h4 style={{ fontStyle: 'italic' }}>Namenlos</h4>
  } else {
    return <h4>{props.name}</h4>
  }
}
