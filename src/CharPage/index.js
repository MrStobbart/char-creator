import React from 'react';
import { connect } from 'react-redux';

// Actions
import {
  createCharacter,
  updateCharacter,
} from '../App/actions';

// Components
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { InfoPanel }from './components/InfoPanel';

// The charpage has its own state that will be synced with the redux state on submit. Performance reasons
class CharPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charData: {},
      unsavedChanges: false,
      charDataCreated: false,
    }
  }

  componentDidMount() {
    
    this.initializeCharPage();
  }


  componentWillReceiveProps(nextProps) {

    this.initializeCharPage(nextProps);

  }

  initializeCharPage(props) {
    const nextProps = props ? props : this.props;
    const characterId = this.props.match.params.characterId;
    console.log('characterId', this.props.match.params, this.props.match.params.characterId ? true : false, 'character id nextprops', nextProps.match.params.characterId ? true : false, 'charsheet',nextProps.charSheet ? true : false,'characters', nextProps.characters ? true : false)

    // Load character with id
    if (nextProps.charSheet && nextProps.characters && characterId) {
      const loadedCharData = nextProps.characters.find(character => character._id === characterId);
      console.log('loasdasdf', loadedCharData, this.state)
      if (loadedCharData) {
        
        this.setState(prevState => {
          return {
            ...prevState,
            charData: loadedCharData,
            charDataCreated: true
          }
        })
      } else {

        // TODO Hack to avoid an error with invalid param id
        this.createEmptyCharData(nextProps);
      }
    }

    // Create empty character 
    if (nextProps.charSheet && !characterId) {
      console.log('create empty char data ')
      this.createEmptyCharData(nextProps);
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

      return {
        charData: { ...charDataFieldsets, ...nextProps.charSheet.meta.defaultData },
        charDataCreated: true
      }
    });
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
    console.log('Update function fieldset: ', fieldsetId, ' field: ' , field, ' newValue: ', newValue, 'fieldId: ' , fieldId)
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
    console.log('save changes');
    this.setState(prevState => ({
      ...prevState,
      unsavedChanges: false
    }))
    if (this.state.charData._id) {
      console.log('update this char chardate ', this.state.charData)
      const serverRes = this.props.updateCharacter(this.state.charData)
      console.log('updated char', serverRes)
    } else {
      // Create new char
      const charDataWithId = this.props.createCharacter(this.state.charData)
      this.setState(prevState => ({
        ...prevState,
        charData: charDataWithId
      }))
    }
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
    createCharacter: (character) => { dispatch(createCharacter(character)) },
    updateCharacter: (character) => { dispatch(updateCharacter(character)) },
  }
}



