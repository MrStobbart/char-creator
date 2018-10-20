import React from 'react';
import classNames from 'classnames';


export class DisplayField extends React.Component{

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