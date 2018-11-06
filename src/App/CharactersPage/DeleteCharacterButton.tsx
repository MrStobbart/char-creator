import * as React from 'react';

export interface Props{
  deleteCharacter: (id: string) => {}
  characterId: string
}
export class DeleteCharacterButton extends React.Component<Props>{


  handleClick = (event: React.MouseEvent) =>{
    event.preventDefault();
    this.props.deleteCharacter(this.props.characterId)
  }

  render() {
    return (
      <button uk-close="true" className="uk-close-large" style={{ zIndex: 100 }} onClick={this.handleClick}></button>
    )
  }  
}