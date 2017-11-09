import React from 'react';
import PropTypes from 'prop-types';
import './BoxField.css';

export class BoxField extends React.Component {

  constructor(props) {
    super();
    const index = props.default ? props.default : 0
    this.state = {
      index,
      value: props.values[index],
    }
  }

  decrease = (event) => {
    event.preventDefault();
    this.setState((prevState, props) => {
      const index = prevState.index !== 0 ? prevState.index - 1 : prevState.index
      this.props.updateValue(index);
      return {
        index,
        value: props.values[index]
      }
    })
    this.forceUpdate()
  }

  increase = (event) => {
    event.preventDefault();
    this.setState((prevState, props) => {
      if (prevState.index + 1 >= props.values.length) {
        return prevState;
      }
      const index = prevState.index + 1;
      this.props.updateValue(index);
      return { index, value: props.values[index] };
    })
    this.forceUpdate()
  }

  render() {
    return(
      <div className="column-group quarter-gutters">
        <label className="all-40 align-left" htmlFor="name">{this.props.children}</label>
        <div className="control all-60">
          <button className="change-button" onClick={this.decrease}>-</button>
          <input
            className="box-field"
            type="text"
            value={this.state.value}
            readOnly
          />
          <button className="change-button" onClick={this.increase}>+</button>
        </div>
      </div>
    )
  }
}



BoxField.propTypes = {
  values: PropTypes.array.isRequired,
  type: PropTypes.string,
  children: PropTypes.string.isRequired
}