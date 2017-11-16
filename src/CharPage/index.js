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
        return {
          charData: { ...prevState.charData, ...nextProps.charSheet.meta.defaultData }
        }
      });
    }
  }


  // TODO Make this with different functions depending on the data type
  createUpdateValueFunction = (field, charDataType) => newValue => {
    console.log('Update function fieldset: ', charDataType, ' field:', field, ' newValue:', newValue)
    this.setState(prevState => {

      let newState = { ...prevState };

      switch (charDataType) {
        case 'value':
          newState = this.updateCharDataValue(newState, field, newValue);
          break;
        case 'special':
          newState = this.updateCharDataSpecial(newState, field, newValue);
        default:
          newState = this.updateCharDataInformation(newState, field, newValue);  
          break;
      }

      newState.unsavedChanges = true;
      console.log('newState', newState);
      return newState;
    })
  }

  updateCharDataValue = (newState, field, newValue) => {

      // Find and add the calculation type of new data to saved data 
      if (!newState.charData.values[field.id]) {

        newState.charData.values[field.id] = {}
        newState.charData.values[field.id].calculationType = field.calculationType

        if (field.attribute) {
          newState.charData.values[field.id].attribute = field.attribute
        }
      }
      // Set new state
      newState.charData.values[field.id].value = newValue;
      return newState;
  }  

  updateCharDataSpecial = (newState, field, newValue) => {
    // const new
    newState.specials.push
    return newState
  }

  updateCharDataInformation = (newState, field, newValue) => {
      newState.charData.information[field.id] = newValue;
      return newState;
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
    return (
      <div uk-grid="true" style={style}>
        <div className="uk-width-1-6">
          <Navigation fieldsets={this.props.charSheet.fieldsets} />
        </div>
        <div className="uk-width-2-3">
          <Content
            charSheet={this.props.charSheet}
            createUpdateValueFunction={this.createUpdateValueFunction}
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

