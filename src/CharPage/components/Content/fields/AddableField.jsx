import React from 'react';
import { AutocompleteField } from './AutocompleteField';
import './AddableField.css';
import shortid from 'shortid';

export class AddableField extends React.Component {
  

  addField = (event) => {
    event.preventDefault();
    const newField = {fieldId: shortid.generate()}
    this.props.addField(newField)
  }

  createRemoveFieldFunction = fieldId => event => {
    event.preventDefault();
    this.props.removeField(fieldId);
  }

  createUpdateValueFunction = fieldId => value => {
    this.props.updateValue(fieldId, value);
  }

  render() {
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