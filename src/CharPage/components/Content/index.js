import React from 'react';
import { Fieldset } from './Fieldset';
import { CharHeader } from './CharHeader';

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charSheetData: {},
      unsavedChanges: false,
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.charSheet) {
      this.setState(prevState => ({
        ...prevState,
        charSheetData: nextProps.meta.defaultData
      }));
      // TODO this will not be called in time - set state is delayed (why does it has to be called?)
      this.createFieldsets(nextProps);
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
    this.createFieldsets(this.props)
  }

  saveChanges = () => {
    this.setState(prevState => ({
      ...prevState,
      unsavedChanges: false
    }))
    console.log('save changes');
    // TODO dispatch save action
  }

  // TODO why is this not re-rendering on state change (and createFieldsets() has to be called again?)
  createFieldsets(nextProps) {
    this.fieldsets = nextProps.charSheet.map(fieldset =>
      <Fieldset
        key={fieldset.id}
        fieldset={fieldset}
        meta={{ defaultValues: nextProps.meta.defaultValues }}
        createUpdateValueFunction={this.makeCreateUpdateValueFunction(fieldset.id)}
        charSheetData={this.state.charSheetData}
      />
    );
  }


  
  render() {
    console.log('saved data:', this.state.charSheetData);
    return (
      <div className="xlarge-70 large-60 medium-50 small-100 tiny-100">
        <CharHeader
          charSheetData={this.state.charSheetData}
          saveChanges={this.saveChanges}
          unsavedChanges={this.state.unsavedChanges}
        />  
        <form>
          {this.fieldsets}
        </form>
      </div>
    )
  }
  
}