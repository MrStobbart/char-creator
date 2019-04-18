import * as React from 'react';
import classNames from 'classnames';

// TODO is only value ok here?
export interface Props {
  value: number;
}

export class DisplayField extends React.Component<Props> {
  render() {
    const classes = classNames({
      'uk-margin uk-alert': true,
      'uk-alert-danger': this.props.value < 0,
    });
    return (
      <div className={classes}>
        {this.props.children}: {this.props.value}
      </div>
    );
  }
}
