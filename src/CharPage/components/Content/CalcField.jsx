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

  // charSheetData = { props.charSheetData }
  // calculation = { field.calculation }
  // modifier = { props.charSheetData.id }

  componentWillReceiveProps(nextProps) {
    console.log('received props', nextProps)
    this.calculateValue();
  }

  calculateValue() {
    const calculation = this.props.calculation.split(' ');
    console.log('calculation', calculation)
    const calculationString = calculation.map(argument => {
      if (argument.length > 2) {
        return this.props.charSheetData[argument] ? this.props.charSheetData[argument] : 0;
      } else {
        return argument
      }
    }).join(' ');
    console.log('calculationString', calculationString)
    console.log('this.props.modifier', this.props.modifier)
    const modifier = this.props.modifier ? this.props.modifier : 0
    const newValue = eval(calculationString) + modifier;
    console.log('newValue', newValue)
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
