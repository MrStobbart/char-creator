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
      charSheetData: {},
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
      this.setState(prevState => ({
        charSheetData: nextProps.charSheet.meta.defaultData,
      }));
    }
  }

  makeCreateUpdateValueFunction = fieldsetId => field => newValue => {
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

  // No logic so far
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
            makeCreateUpdateValueFunction={this.makeCreateUpdateValueFunction}
            charSheetData={this.state.charSheetData}
          />
        </div>
        <div className="uk-width-1-6">
          <InfoPanel
            charSheetData={this.state.charSheetData}
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

