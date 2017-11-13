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
      <div className="column-group quarter-gutters">
        <label className="all-40 align-left" htmlFor="name">{this.props.children}</label>
        <div className="control all-60">
          <input
            className="number-field"
            value={this.state.value}
            readOnly
          />
        </div>
      </div>
    )
  }
}
