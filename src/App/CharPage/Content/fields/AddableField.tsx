import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { AutocompleteField } from './AutocompleteField';

export interface AddableFieldProps{
  addField: () => {}
  removeField: (addableFieldId: string) => {}
  updateValue: (addableFieldId: string, value: number) => {}
}
export class AddableField extends Component<AddableFieldProps> {
  

  addField = (event: MouseEvent) => {
    event.preventDefault();
    this.props.addField()
  }

  createRemoveFieldFunction = (addableFieldId: string) => (event: MouseEvent) => {
    event.preventDefault();
    this.props.removeField(addableFieldId);
  }

  createUpdateValueFunction = (addableFieldId: string) => (value: number) => {
    this.props.updateValue(addableFieldId, value);
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
              <div className="field-remove-button" style={{ float: 'left'}}>
                <button
                  className="uk-icon-button"
                  uk-icon="icon: close; ratio: 1"
                  onClick={this.createRemoveFieldFunction(field.fieldId)}
                  style={{marginTop: 2}}
                >
                </button>
              </div>  
              <div className="removable-field" style={{ float: 'left', marginLeft: 10 }}>
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