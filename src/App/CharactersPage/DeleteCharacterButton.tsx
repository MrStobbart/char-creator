import * as React from 'react';

export interface Props {
  deleteCharacter: () => void;
}
export function DeleteCharacterButton(props: Props) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    props.deleteCharacter();
  };

  return <button uk-close="true" className="uk-close-large" style={{ zIndex: 100 }} onClick={handleClick} />;
}
