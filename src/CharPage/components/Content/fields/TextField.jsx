import React from 'react';
import './TextField.css';

export class TextField extends React.Component {

  constructor(props) {
    super();
    this.state = { value: '', }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.updateValue(event.target.value)
  }

  render() {
    return (
      <div className="">
        <label className="uk-form-label" htmlFor="name">{this.props.children}</label>
        <div className="uk-form-controls">
          <input
            className="text-field uk-input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            />
        </div>
      </div>
    )
  }
}
