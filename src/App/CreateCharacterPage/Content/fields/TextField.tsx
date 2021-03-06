import * as React from 'react';
import { CSSProperties, ChangeEvent } from 'react';
import { TextProperty } from '../../../../models/interfaces';
import { UpdateValue } from '../../../interfaces';

export interface TextFieldProps {
  children: string;
  value: string;
  updateValue: UpdateValue<TextProperty>;
}

export function TextField(props: TextFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.updateValue(event.target.value);
  };

  const style: CSSProperties = {
    borderStyle: 'none',
    borderColor: '#666',
    borderBottomStyle: 'solid',
    borderWidth: 1,
  };

  return (
    <div className="">
      <label className="uk-form-label" htmlFor="name">
        {props.children}
      </label>
      <div className="uk-form-controls">
        <input
          className="uk-input uk-form-small"
          style={style}
          type="text"
          value={props.value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
