import React from 'react';
import { Fieldset } from './Fieldset';

export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charSheetData: {}
    }
  }

  componentDidMount() {
    // TODO default set charsheet data here
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.charSheet) {
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

  
  
  render(){
    return (
      <div className="xlarge-80 large-80 medium-70 small-100 tiny-100">
        <form>
          {this.fieldsets}
        </form>
      </div>
    )
  }
  
}