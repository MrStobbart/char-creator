import React from 'react';
import { AutocompleteField } from './AutocompleteField';
import './AddableField.css';
import shortid from 'shortid';

export class AddableField extends React.Component {
  

  addField = (event) => {
    event.preventDefault();
    const newField = {fieldId: shortid.generate()}
    this.props.addField(newField)
    // const newField = {
    //   fieldId: `field-${this.state.fields.length}`,
    //   value: {}
    // }
    // this.setState(prevState => ({
    //   fields: [...prevState.fields, newField]
    // }))
  }

  createRemoveFieldFunction = fieldId => event => {
    event.preventDefault();
    this.props.removeField(fieldId);
    // this.setState(prevState => {
    //   const newFields = prevState.fields.filter(field => {
    //     // console.log('if check', field.fieldId === fieldId, field.value.id !== undefined, field.value.id)
    //     if (field.fieldId === fieldId && field.value.id !== undefined) {
    //       console.log('remove field', field.value.id)
    //       this.props.removeValue(field.value.id);
    //     }
    //     return field.fieldId !== fieldId
    //   })
    //   return { fields: newFields }
    // })
  }

  createUpdateValueFunction = fieldId => value => {
    this.props.updateValue(fieldId, value);
    // this.setState(prevState => {
    //   const newState = prevState.fields.map(field => { 
    //     if (field.fieldId === fieldId) {
    //       field.value = value;
    //     }
    //     return field;
    //   })
    //   this.props.addValue
    //   return newState;
    // })
  }

  // unused
  // handleChange = (field, event) => {
  //   console.log('handle change', field.id, event.target.value)
  //   this.setState(prevState => {
  //     let newState = { ...prevState };
  //     newState.values[field] = { id: event.target.value };
  //     return newState;
  //   });
  //   this.updateValue(field)(event.target.value);
  // }

  render() {
    console.log('autocomplete values ', this.props.values);
    return (
      <div>
        <div style={{width: 234}}>
          <button
            className="uk-button uk-button-default uk-button-small uk-margin uk-align-center"
            onClick={this.addField}
          >
            Add {this.props.field.label}
          </button>
        </div>
        <div className="uk-margin">
          {this.props.values.map((field) => 
            <div key={field.fieldId} className="uk-margin-small-bottom" style={{ display: 'flex'}}>
              <div className="field-remove-button">
                <button
                  className="uk-icon-button"
                  uk-icon="icon: close; ratio: 1"
                  onClick={this.createRemoveFieldFunction(field.fieldId)}
                  style={{marginTop: 2}}
                >
                </button>
              </div>  
              <div className="removable-field">
                <AutocompleteField
                  placeholder={`Search ${this.props.field.label}`}  
                  selectableGroups={this.props.field.selectableGroups}
                  selectedField={field.id ? field : undefined}
                  updateValue={this.createUpdateValueFunction(field.fieldId)}
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