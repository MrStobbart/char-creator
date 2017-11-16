import React from 'react';
import { AutocompleteField } from './AutocompleteField';
import './AddableField.css';

export class AddableField extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      fields: [],
      values: {}
    }
  }

  createRemoveFieldFunction = fieldId => event => {
    event.preventDefault();
    this.setState(prevState => {
      const newFields = prevState.fields.filter(field => field !== fieldId)
      return { fields: newFields }
    })
  }

  addField = (event) => {
    event.preventDefault();
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
        <div>
          <button
            className="uk-button uk-button-default uk-button-small uk-margin uk-align-center"
            onClick={this.addField}
          >
            Add {this.props.field.label}
          </button>
        </div>
        <div className="uk-margin">
          {this.state.fields.map(field => 
            <div key={field} className="uk-margin-small-bottom" style={{ display: 'flex'}}>
              <div className="field-remove-button">
                <button
                  className="uk-icon-button"
                  uk-icon="icon: close; ratio: 1"
                  onClick={this.createRemoveFieldFunction(field)}>
                </button>
              </div>  
              <div className="removable-field">
                <AutocompleteField
                  placeholder={`Search ${this.props.field.label}`}  
                  selectableGroups={this.props.field.selectableGroups}
                  value={this.state.values[field]}
                  onChange={this.handleChange}
                >
                  Label
                </AutocompleteField>
              </div>  
            </div>  
          )}
        </div>
      </div>
    )
  }
}