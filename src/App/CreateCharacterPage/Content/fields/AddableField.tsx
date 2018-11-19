import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { AutocompleteField } from './AutocompleteField';
import { Quality } from 'src/models/interfaces';
import { AddQuality, RemoveQuality, QualityData } from 'src/App/interfaces';
import { Qualities } from 'src/models/Qualities';
import { connect, MapDispatchToProps } from 'react-redux';
import { Store } from 'src/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';


interface Props extends PropsFromState, PropsFromDispatch, AddableFieldProps { }

interface AddableFieldProps{
  removeQuality: RemoveQuality
  addQuality: AddQuality
  qualities: Qualities<Quality>
}


interface State{
  warning: string
}
class AddableField extends Component<Props, State> {

  constructor(props: AddableFieldProps) {
    super(props);
    this.state = {
      warning: ''
    }
  }

  createRemoveQuality = (qualityId: string) => (event: MouseEvent) => {
    event.preventDefault();
    this.props.removeQuality(this.props.qualities.id, qualityId);
  }

  createAddQuality = (addableFieldId: string) => (value: number) => {
  }

  render() {
    return (
      <div>
        <div>
          <div style={{ float: 'left', marginLeft: 10 }}>
            Toast
            {/* <AutocompleteField
              placeholder={`Search ${this.props.field.label}`}
              selectableGroups={this.props.field.selectableGroups}
              selectedField={field.id ? field : undefined}
              updateValue={this.createAddQuality(field.fieldId)}
            >
              Label
            </AutocompleteField> */}
          </div>
        </div>
        <div className="uk-margin">
          {this.state.warning}
        </div>
        <div className="uk-margin">
          {this.props.qualities.map(quality => 
            <div
              key={quality.id}
              className="uk-margin-small-bottom"
              style={{ display: 'flex' }}
            >
              <div>
                {quality.label}
              </div>
              <div className="field-remove-button" style={{ float: 'left' }}>
                <button
                  className="uk-icon-button"
                  uk-icon="icon: close; ratio: 1"
                  onClick={this.createRemoveQuality(quality.id)}
                  style={{ marginTop: 2 }}>
                </button>
              </div>  
            </div>
          )}
        </div>
         
      </div>
    )
  }
}

export default connect<PropsFromState, PropsFromDispatch, void>(mapStateToProps, mapDispatchToProps)(AddableField)

interface PropsFromState {
  qualities: QualityData
}
interface PropsFromDispatch {
}

function mapStateToProps(state: Store): PropsFromState {
  return {
    qualities: state.app.qualities
  }
}
function mapDispatchToProps(dispatch: ThunkDispatch<Store, any, Action>): MapDispatchToProps<PropsFromDispatch, void> {
  return {
  }
}