import React from 'react';
import classNames from 'classnames';
import './CharHeader.css';


export function CharHeader(props) {

  return (
    <div>
      {props.character.charCreationInformation.map(info => <DisplayField value={info.value}>{info.label}</DisplayField>)}
      <div className="uk-margin">
        <button className="uk-button uk-button-default uk-button-small" onClick={props.saveChanges}>
          {props.unsavedChanges ? 'Unsaved changes': 'Everything saved'}
        </button>
      </div>  
      <div className="uk-margin">
        <button className="uk-button uk-button-default uk-button-small">
          Finish char creation
        </button>
      </div>  
    </div>
  )
  
}

class DisplayField extends React.Component{

  render() {
    const classes = classNames({
      'uk-margin uk-alert': true,
      'uk-alert-danger': this.props.value < 0
    });
    return (
      <div className={classes}>
        {this.props.children}: {this.props.value}
      </div>
    )
  }
  
}