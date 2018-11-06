import * as React from 'react';
import { MouseEvent, CSSProperties } from 'react';
import { UpdateValue, NumberProperty } from 'src/interfaces';

// TODO maybe make this properly
export interface NumberFieldProps{
  updateValue: UpdateValue<NumberProperty>
  value: number
  children: string
  availableValues: string[]
  default?: number
}

export function NumberField(props: NumberFieldProps) {

  const decrease = (event: MouseEvent) => {
    event.preventDefault();
    if (props.value === 0 || props.default === props.value) {
      return
    }
    props.updateValue(props.value - 1)
  }

  const increase = (event: MouseEvent) => {
    event.preventDefault();
    if (props.value + 1 >= props.availableValues.length) {
      return;
    }
    props.updateValue(props.value ? props.value + 1 : 1);
  }

  const changeButtonStyle: CSSProperties = {
    width: 32,
    height: 32
  }

  return (
    <div>
      <label className="uk-form-label" htmlFor="name">{props.children}</label>
      <div className="uk-form-controls">
        <button
          className="uk-icon-button"
          uk-icon="icon: minus; ratio: 0.7"
          onClick={decrease}
          style={changeButtonStyle}>
        </button>
        <input
          className="number-field uk-input uk-form-small"
          type="text"
          value={props.value ? props.availableValues[props.value] : ''}
          readOnly
        />
        <button
          className="uk-icon-button change-button"
          uk-icon="icon: plus; ratio: 0.7"
          onClick={increase}
          style={changeButtonStyle}>
        </button>
      </div>
    </div>
  )
}