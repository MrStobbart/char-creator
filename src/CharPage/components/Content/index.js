import React from 'react';
import { Fieldset } from './Fieldset';

export class Content extends React.Component {

  componentDidMount() {
    this.fieldsets = [];
    this.charSheetData = {}
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.charSheet) {
      this.charSheet = nextProps.charSheet;
      this.fieldsets = nextProps.charSheet.map(fieldset =>
        <Fieldset
          key={fieldset.id}
          fieldset={fieldset}
          meta={{ defaultValues: nextProps.meta.defaultValues }}
          createUpdateValueFunction={this.createUpdateValueFunction}
        />
      );
    }
  }

  createUpdateValueFunction = id => newValue => {
    this.charSheetData[id] = newValue;
    console.log(this.charSheetData);
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