import React from 'react';
import { Fieldset } from './Fieldset';
import { CharHeader } from './CharHeader';

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charSheet: {
        id: '',
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

  makeCreateUpdateValueFunction = fieldsetId => field=> newValue => {
    console.log('Update function fieldset: ', fieldsetId, ' field', field)
    this.setState((prevState, props) => {
      let newState = { ...prevState }

      // Find and add the calculation type of new data to saved data 
      if (!newState.charSheetData[field.id]) {
        newState.charSheetData[field.id] = {}
        if (field.calculationType) {
          newState.charSheetData[field.id].calculationType = field.calculationType
        }

        if (field.attribute) {
          newState.charSheetData[field.id].attribute = field.attribute
        }
      }
      
      // Set new state
      newState.charSheetData[field.id].value = newValue;
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

  calculateStuff = () => {
    switch (this.state.charSheet.id) {
      case 'savageWorldsFantasy':
        this.savageWorldsFantasyCalculations();
        break;
      default:
        console.error('Unkown char sheet id');
        break;
    }
  }

  render() {
    return (
      <div className="xlarge-70 large-60 medium-50 small-100 tiny-100">
        <CharHeader
          charSheetData={this.state.charSheetData}
          meta={this.state.charSheet.meta}
          charSheetId={this.state.charSheet.id}
          saveChanges={this.saveChanges}
          unsavedChanges={this.state.unsavedChanges}
        />
        <form>
          {this.state.charSheet.fieldsets.map(fieldset =>
            <Fieldset
              key={fieldset.id}
              fieldset={fieldset}
              meta={this.state.charSheet.meta}
              createUpdateValueFunction={this.makeCreateUpdateValueFunction(fieldset.id)}
              charSheetData={this.state.charSheetData}
            />
          )}
        </form>
      </div>
    )
  }
  
}