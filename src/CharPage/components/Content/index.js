import React from 'react';
import { Fieldset } from './Fieldset';
import { CharHeader } from './CharHeader';

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charSheetData: {}
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.charSheet) {
      this.state.charSheetData = nextProps.meta.defaultData;
      this.createFieldsets(nextProps);
    }
  }

  createUpdateValueFunction = id => newValue => {
    this.setState((prevState, props) => {
      let newState = { ...prevState }
      newState.charSheetData[id] = newValue;
      return newState;
    })
    console.log('newState', this.state);
    this.createFieldsets(this.props)
  }

  // TODO why is this not re-rendering on state change (and createFieldsets() has to be called again?)
  createFieldsets(nextProps) {
    this.fieldsets = nextProps.charSheet.map(fieldset =>
      <Fieldset
        key={fieldset.id}
        fieldset={fieldset}
        meta={{ defaultValues: nextProps.meta.defaultValues }}
        createUpdateValueFunction={this.createUpdateValueFunction}
        charSheetData={this.state.charSheetData}
      />
    );
  }

  
  
  render() {
    console.log('saved data:', this.state.charSheetData);
    return (
      <div className="xlarge-70 large-60 medium-50 small-100 tiny-100">
        <CharHeader />  
        <form>
          {this.fieldsets}
        </form>
      </div>
    )
  }
  
}