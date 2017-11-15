import React from 'react';
import { AutocompleteField } from './AutocompleteField';

export class AddableField extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      fields: ['field-0'],
      values: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable) {
      this.addField();
    }
  }


  addField = (event) => {
    if (event) {
      event.preventDefault();
    }
    const newField = `field-${this.state.fields.length}`;
    this.setState(prevState => ({
      fields: [...prevState.fields, newField]
    }))
  }

  handleChange = (field, event) => {
    console.log('handle change', field.id)
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.values[field] = event.target.value;
      return newState;
    });
    this.updateValue(field)(event.target.value);
  }

  render() {
    console.log('Addable field props', this.props);
    return (
      <div>
        {this.state.fields.map(field => 
          <AutocompleteField
            key={field}
            selectableGroups={this.props.field.selectableGroups}
            value={this.state.values[field]}
            onChange={this.handleChange}
          >
            Label
          </AutocompleteField>
        )}
        <button className="uk-button uk-button-default uk-button-small" onClick={this.addField}>
          Add field
        </button>
      </div>
    )
  }
}

function Field(props) {
  return (
    <div className="">
      {/* <label className="uk-form-label" htmlFor="name">{props.children}</label> */}
      <div className="uk-form-controls">
        <input
          className="text-field uk-input"
          type="text"
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}