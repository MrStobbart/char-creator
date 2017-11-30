import React from 'react';

export class DeleteCharacterButton extends React.Component{


  handleClick = (e) =>{
    e.preventDefault();
    this.props.deleteCharacter(this.props.characterId)
  }

  render() {
    return (
      <button uk-close="true" className="uk-close-large" style={{ zIndex: 100 }} onClick={this.handleClick}></button>
    )
  }  
}