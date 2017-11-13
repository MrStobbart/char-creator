import React from 'react';
import './NumberField.css';

export class NumberField extends React.Component {

  constructor(props) {
    super();
    this.default = props.field.default ? props.field.default : 0;
    this.state = {
      value: this.default,
      displayValue: props.values[this.default],
    }
  }

  decrease = (event) => {
    event.preventDefault();
    this.setState((prevState, props) => {
      const value = prevState.value !== this.default ? prevState.value - 1 : prevState.value
      this.props.updateValue(value);
      return {
        value,
        displayValue: props.values[value]
      }
    })
    this.forceUpdate();
  }

  increase = (event) => {
    event.preventDefault();
    this.setState((prevState, props) => {
      if (prevState.value + 1 >= props.values.length) {
        return prevState;
      }
      const value = prevState.value + 1;
      this.props.updateValue(value);
      return { value, displayValue: props.values[value] };
    })
    this.forceUpdate();
  }

  render() {
    return(
      <div className="column-group quarter-gutters">
        <label className="all-40 align-left" htmlFor="name">{this.props.children}</label>
        <div className="control all-60">
          <button className="change-button" onClick={this.decrease}>-</button>
          <input
            className="number-field"
            type="text"
            value={this.state.displayValue}
            readOnly
          />
          <button className="change-button" onClick={this.increase}>+</button>
        </div>
      </div>
    )
  }
}