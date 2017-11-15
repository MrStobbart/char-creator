/* eslint no-eval: 0 */
import React from 'react';
import './CalcField.css';

export class CalcField extends React.Component {

  constructor(props) {
    super();
    this.state = { value: '', }
  }

  componentDidMount() {
    this.calculateValue();
  }

  componentWillReceiveProps(nextProps) {
    this.calculateValue();
  }

  calculateValue() {
    const calculationString = this.props.calculation
      .split(' ')
      .map(argument => {
        if (argument.length > 2) {
          // The argument is a variable
          return this.props.charSheetData[argument] ? this.props.charSheetData[argument].value : 0;
        } else {
          return argument
        }
      })
      .join(' ');
    const modifier = this.props.modifier ? this.props.modifier : 0
    const newValue = eval(calculationString) + modifier;
    this.setState({value: newValue})
  }

  render() {
    return (
      <div className="">
        <label className="uk-form-label" htmlFor="name">{this.props.children}</label>
        <div className="uk-form-controls">
          <input
            className="number-field uk-input uk-form-small"
            value={this.state.value}
            readOnly
          />
        </div>
      </div>
    )
  }
}
