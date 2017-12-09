import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import CharSheetClass from '../Rulesets/SavageWorldsFantasy/CharSheet';
// Actions
import { upsertCharacter } from '../App/actions';

// Components
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { InfoPanel }from './components/InfoPanel';

// The charpage has its own state that will be synced with the redux state on submit. Performance reasons
class CharPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charData: undefined,
      unsavedChanges: false,
      charDataCreated: false,
      id: undefined
    }
    this.test = new CharSheetClass();
  }

  componentDidMount() {
    
    this.initializeComponent(this.props)
  }


  componentWillReceiveProps(nextProps) {

    this.initializeComponent(nextProps)

  }

  initializeComponent(props) {
    if (props.charSheet) {
      const characterId = props.match.params.characterId;

      if (characterId && props.characters) {
        this.loadSelectedCharData(props);
      }

      if (!characterId) {
        this.createEmptyCharData(props);
      }
    }
  }

  loadSelectedCharData(props) {
    const nextProps = props ? props : this.props;
    const characterId = nextProps.match.params.characterId;

    const loadedCharData = nextProps.characters.find(character => character._id === characterId);

    // If not found there will be an endless spinner - invalid id
    if (loadedCharData) {
      
      this.setState(prevState => {
        return {
          ...prevState,
          charData: loadedCharData,
          charDataCreated: true
        }
      })
    } 
  }

  createEmptyCharData(nextProps) {
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
      // TODO add short id to path!
      const id = shortid.generate();
      
      return {
        charData: {
          ...charDataFieldsets,
          ...nextProps.charSheet.meta.defaultData,
          _id: id
        },
        charDataCreated: true,
        id: id
      }
    });
  }

  makeCreateUpdateInformationField = fieldsetId => field => newValue => {
    this.setState(prevState => {

      let newState = { ...prevState };
      newState.charData[fieldsetId][field.id] = newValue;
      newState.unsavedChanges = true;
      return newState;
    })  
  }

  makeCreateUpdateNumberField = fieldsetId => field => newValue => {
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
    this.setState(prevState => {
      let newState = { ...prevState };

      newState.charData[fieldsetId][field.id] = newState.charData[fieldsetId][field.id]
        .map(addableField => addableField.fieldId === fieldId ? { ...addableField, ...newValue } : addableField);
      console.log('update value')
      newState.unsavedChanges = true;
      return newState;
    })      
  }

  makeCreateRemoveAddableField = fieldsetId => field => fieldId => { 
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
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.charData[fieldsetId][field.id].push(newValue);
      newState.unsavedChanges = true;
      return newState;
    })
  }

  saveChanges = () => {
    this.props.upsertCharacter(this.state.charData);
    this.props.history.push(`/charpage/${this.state.id}`)
    this.setState(prevState => ({
      ...prevState,
      unsavedChanges: false
    }))
  }


  

  render() {
    let charPage = null;
    if (this.state.charDataCreated) {
      charPage = (
        <div uk-grid="true">
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
        {!this.state.charDataCreated ? (
          <div
            uk-spinner={''}
            style={{
              textAlign: 'center',
              display: 'block',
              margin: 'auto',
              padding: 30
            }} />
        ) : null}
        {charPage}
      </div>
    )
  }
}


/**
 * CharPageContainer
 */
export default connect(mapStateToProps, mapDispatchToProps)(CharPage)

function mapStateToProps(state) {
  return {
    charSheet: state.app.charSheet,
    characters: state.app.characters
  }
}
function mapDispatchToProps(dispatch) {
  return {
    upsertCharacter: (character) => { dispatch(upsertCharacter(character)) },
  }
}



