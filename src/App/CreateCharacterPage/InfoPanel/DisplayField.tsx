import * as React from 'react';
import classNames from 'classnames';

// TODO is only value ok here?
export interface Props {
  value: number;
  children: React.ReactNode;
}

export function DisplayField(props: Props) {
  const classes = classNames({
    'uk-margin uk-alert': true,
    'uk-alert-danger': props.value < 0,
  });
  return (
    <div className={classes}>
      {props.children}: {props.value}
    </div>
  );
}
