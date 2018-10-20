import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
// Actions
import { upsertCharacter } from '../actions';

// Components
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { InfoPanel } from './components/InfoPanel';
import Character from '../../models/savageWorldsCharacter';
import CharSheet from '../../Rulesets/SavageWorldsFantasy/CharSheet';

// The charpage has its own state that will be synced with the redux state on submit. Performance reasons
class CharPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      charSheet: new CharSheet(),
      charData: undefined,
      unsavedChanges: false,
      id: undefined
    }
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


  makeCreateSetValue = fieldsetId => field => newValue => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.charSheet.setValue(fieldsetId, field.id, newValue)
      newState.unsavedChanges = true;
      return newState
    })
  }

  createGetValue = fieldsetId => fieldId => {
    return this.state.charSheet.getValue(fieldsetId, fieldId)
  }


  createUpdateAddableField = fieldsetId => (addableFieldId, special) => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.charSheet.updateSpecialField(fieldsetId, addableFieldId, special)
      newState.unsavedChanges = true;
      return newState;
    })      
  }

  createRemoveAddableField = fieldsetId => addableFieldId => { 
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.charSheet.removeSpecialField(fieldsetId, addableFieldId)
      newState.unsavedChanges = true;
      return newState;
    })  
  }

  createAddAddableField = fieldsetId => () => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.charSheet.addSpecialField(fieldsetId)
      newState.unsavedChanges = true;
      return newState;
    })
  }

  saveChanges = () => {
    this.props.upsertCharacter(this.state.charSheet.character);
    this.props.history.push(`/charpage/${this.state.id}`)
    this.setState(prevState => ({
      ...prevState,
      unsavedChanges: false
    }))
  }


  

  render() {
    return (
      <div uk-grid="true">
        <div className="uk-width-1-6">
          <Navigation fieldsets={this.state.charSheet.character.fieldsets} />
        </div>
        <div className="uk-width-2-3">
          <Content
            availableValues={this.state.charSheet.availableValues}
            makeCreateSetValue={this.makeCreateSetValue}
            createGetValue={this.createGetValue}
            character={this.state.charSheet.character}
            createAddAddableField={this.createAddAddableField}
            createUpdateAddableField={this.createUpdateAddableField}
            createRemoveAddableField={this.createRemoveAddableField}
          />
        </div>
        <div className="uk-width-1-6">

          <InfoPanel
            character={this.state.charSheet.character}
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



