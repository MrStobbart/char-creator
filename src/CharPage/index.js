import React from 'react';
import { connect } from 'react-redux';

// Actions
import { fetchCharPageByEndpoint } from './actions';

// Components
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { InfoPanel }from './components/InfoPanel';

// The charpage has its own state that will be synced with the redux state on submit. Performance reasons
export class CharPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charData: {
        information: {},
        values: {},
        specials: [],
        equipment: []
      },
      unsavedChanges: false,
      charDataCreated: false
    }
  }

  componentDidMount() {
    this.props.fetchCharPageByEndpoint(this.props.match.params.endpoint);
  }

  componentWillReceiveProps(nextProps) {

    console.log('nextProps', nextProps)

    if (this.props.match.params.endpoint !== nextProps.match.params.endpoint) {
      this.props.fetchCharPageByEndpoint(nextProps.match.params.endpoint);
    }

    if (nextProps.charSheet) {
      this.setState(prevState => { 

        // Create fieldsets in char data
        let charDataFieldsets = {};
        nextProps.charSheet.fieldsets.forEach(fieldset => {
          charDataFieldsets[fieldset.id] = {}
          fieldset.fields.forEach(field => {
            
            // Set field datatype according to type
            switch (field.type) {
              case 'addable':
                charDataFieldsets[fieldset.id][field.id] = [];
                break;
              case 'number':
                if (field.default) {
                  charDataFieldsets[fieldset.id][field.id] = {
                    value: field.default,
                    calculationType: field.calculationType
                  };
                } else {
                  charDataFieldsets[fieldset.id][field.id] = {};
                }
                break;
              case 'calculated':
                break;
              default:
                charDataFieldsets[fieldset.id][field.id] = '';  
                break;
            }
          })
        });

        console.log('merged', { ...charDataFieldsets, ...nextProps.charSheet.meta.defaultData });
        return {
          charData: { ...charDataFieldsets, ...nextProps.charSheet.meta.defaultData },
          charDataCreated: true
        }
      });
    }
  }

  makeCreateUpdateInformationField = fieldsetId => field => newValue => {
    console.log('Update function fieldset: ', fieldsetId, ' field:', field, ' newValue:', newValue)
    this.setState(prevState => {

      let newState = { ...prevState };
      newState.charData[fieldsetId][field.id] = newValue;
      newState.unsavedChanges = true;
      return newState;
    })  
  }

  makeCreateUpdateNumberField = fieldsetId => field => newValue => {
    console.log('Update function fieldset: ', fieldsetId, ' field:', field, ' newValue:', newValue)
    this.setState(prevState => {

      let newState = { ...prevState };
    // TODO optimise this so it will not be called every time
      newState.charData[fieldsetId][field.id].calculationType = field.calculationType

      if (field.attribute) {
        newState.charData[fieldsetId][field.id].attribute = field.attribute
      }
      // Set new state
      newState.charData[fieldsetId][field.id].value = newValue;
      newState.unsavedChanges = true;
      return newState;
    })    
  } 

  makeCreateUpdateAddableField = fieldsetId => field => (fieldId, newValue) => {
    console.log('Update function fieldset: ', fieldsetId, ' field:', field, ' newValue:', newValue)
    this.setState(prevState => {
      let newState = { ...prevState };

      console.log('update value')
      newState.unsavedChanges = true;
      return newState;
    })      
  }

  makeCreateRemoveAddableField = fieldsetId => field => fieldId => { 
    console.log('remove function fieldset: ', fieldsetId, ' field:', field, ' fieldId:', fieldId)
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.charData[fieldsetId][field.id] = newState.charData[fieldsetId][field.id].filter(addableField => {
        console.log(addableField.fieldId)
        return addableField.fieldId !== fieldId
      });
      console.log('newState', newState)
      newState.unsavedChanges = true;
      return newState;
    })  
  }

  makeCreateAddAddableField = fieldsetId => field => newValue => {
    console.log('add function fieldset: ', fieldsetId, ' field:', field, ' newValue:', newValue)
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.charData[fieldsetId][field.id].push(newValue);
      newState.unsavedChanges = true;
      return newState;
    })
  }

  saveChanges = () => {
    this.setState(prevState => ({
      ...prevState,
      unsavedChanges: false
    }))
    console.log('save changes');
    // TODO dispatch save action
  }

  // TODO No logic so far
  // calculateStuff = () => {
  //   switch (this.state.charSheet.id) {
  //     case 'savageWorldsFantasy':
  //       this.savageWorldsFantasyCalculations();
  //       break;
  //     default:
  //       console.error('Unkown char sheet id');
  //       break;
  //   }
  // }

  

  render() {
    const style = { marginTop: '12px' };
    let charPage = null;
    if (this.state.charDataCreated) {
      charPage = (
        <div uk-grid="true" style={style}>
          <div className="uk-width-1-6">
            <Navigation fieldsets={this.props.charSheet.fieldsets} />
          </div>
          <div className="uk-width-2-3">
            <Content
              charSheet={this.props.charSheet}
              makeCreateUpdateInformationField={this.makeCreateUpdateInformationField}
              makeCreateUpdateNumberField={this.makeCreateUpdateNumberField}
              makeCreateUpdateAddableField={this.makeCreateUpdateAddableField}
              makeCreateRemoveAddableField={this.makeCreateRemoveAddableField}
              makeCreateAddAddableField={this.makeCreateAddAddableField}
              charData={this.state.charData}
            />
          </div>
          <div className="uk-width-1-6">

            <InfoPanel
              charData={this.state.charData}
              meta={this.props.charSheet.meta}
              charSheetId={this.props.charSheet.id}
              saveChanges={this.saveChanges}
              unsavedChanges={this.state.unsavedChanges}
            />
          </div>
        </div>
      )
    }
    return (
      <div>
        {!this.state.charDataCreated ? (<div uk-spinner={''} />) : null}
        {charPage}
      </div>
    )
  }
}


/**
 * CharPageContainer
 */
export const CharPageContainer = connect(mapStateToProps, mapDispatchToProps)(CharPage)

function mapStateToProps(state) {
  console.log('this is the state', state);
  return {
    charSheet: state.charPage.charSheet
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchCharPageByEndpoint: (endpoint) => {
      dispatch(fetchCharPageByEndpoint(endpoint))
    }
  }
}

