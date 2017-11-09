import React from 'react';
import PropTypes from 'prop-types';
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
      <div className="column-group quarter-gutters">
        <label className="all-40 align-left" htmlFor="name">{this.props.children}</label>
        <div className="control all-60">
          <input
            className="text"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            />
        </div>
      </div>
    )
  }
}

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  
}