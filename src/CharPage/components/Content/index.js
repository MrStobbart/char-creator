import React from 'react';
import { Fieldset } from './Fieldset';
import { CharHeader } from './CharHeader';

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charSheet: {
        name: '',
        meta: {},
        fieldsets: []
      },
      charSheetData: {},
      unsavedChanges: false,
    }
  }

  componentWillReceiveProps(nextProps) {

    console.log('nextProps', nextProps)
    if (nextProps.charSheet) {
      this.setState(prevState => ({
        ...prevState,
        charSheet: nextProps.charSheet,
        charSheetData: nextProps.charSheet.meta.defaultData,
      }));
    }
  }

  makeCreateUpdateValueFunction = fieldsetId => fieldId => newValue => {
    console.log('Update function fieldset: ', fieldsetId, ' fieldId', fieldId)
    this.setState((prevState, props) => {
      let newState = { ...prevState }

      // Find and add the calculation type of new data to saved data 
      if (!newState.charSheetData[fieldId]) {
        newState.charSheetData[fieldId] = {}
        const fieldset = this.props.charSheet.find(fieldset => fieldset.id === fieldsetId);
        const calculationType = fieldset.fields.find(field => field.id === fieldId).calculationType;

        if (calculationType) {
          newState.charSheetData[fieldId].calculationType = calculationType
        }
      }
      
      // Set new state
      newState.charSheetData[fieldId].value = newValue;
      newState.unsavedChanges = true;
      return newState;
    })
    console.log('newState', this.state);
    // this.createFieldsets(this.props)
  }

  saveChanges = () => {
    this.setState(prevState => ({
      ...prevState,
      unsavedChanges: false
    }))
    console.log('save changes');
    // TODO dispatch save action
  }
  
  render() {
    return (
      <div className="xlarge-70 large-60 medium-50 small-100 tiny-100">
        <CharHeader
          charSheetData={this.state.charSheetData}
          meta={this.state.charSheet.meta}
          saveChanges={this.saveChanges}
          unsavedChanges={this.state.unsavedChanges}
        />  
        <form>
          {this.state.charSheet.fieldsets.map(fieldset =>
            <Fieldset
              key={fieldset.id}
              fieldset={fieldset}
              meta={{ availableValues: this.state.charSheet.meta.availableValues }}
              createUpdateValueFunction={this.makeCreateUpdateValueFunction(fieldset.id)}
              charSheetData={this.state.charSheetData}
            />
          )}
        </form>
      </div>
    )
  }
  
}