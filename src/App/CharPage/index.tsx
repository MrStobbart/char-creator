import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Actions
import { upsertCharacter } from '../actions';

// Components
import { Navigation } from './components/Navigation';
import { Content } from './components/Content';
import { InfoPanel } from './components/InfoPanel';
import Character from '../../models/savageWorldsCharacter';
import { Dispatch } from 'redux';
import { Store } from '../../rootReducer';

export interface Props extends RouteComponentProps<any>{
  upsertCharacter: Function,
  characters: Character[],
}

interface State{
  character: Character,
  unsavedChanges: boolean,
}

// The charpage has its own state that will be synced with the redux state on submit. Performance reasons
class CharPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      character: new Character(),
      unsavedChanges: false
    }
  }

  componentDidMount() {
    this.initializeComponent(this.props)
  }


  componentWillReceiveProps(nextProps: Props) {
    this.initializeComponent(nextProps)
  }

  initializeComponent(props: Props) {
    const characterId = props.match.params.characterId;

    if (characterId && props.characters) {
      this.loadSelectedCharacter(characterId, props);
    }
  }

  loadSelectedCharacter(characterId: string, props: Props) {

    const loadedCharacter = props.characters.find(character => character.id === characterId);

    // If not found there will be an endless spinner - invalid id
    if (loadedCharacter) {
      this.setState(prevState => {
        return {
          ...prevState,
          character: loadedCharacter,
        }
      })
    } 
  }


  createSetValue = (property: string) => (newValue: string) => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.character[property] = newValue
      newState.unsavedChanges = true;
      return newState
    })
  }

  getValue = (property: string) => {
    return this.state.character[property]
  }


  updateAddableField = (addableFieldId: string, special) => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.character.updateSpecialField(addableFieldId, special)
      newState.unsavedChanges = true;
      return newState;
    })      
  }

  removeAddableField = (addableFieldId: string) => { 
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.character.removeSpecialField(addableFieldId)
      newState.unsavedChanges = true;
      return newState;
    })  
  }

  addAddableField = () => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.character.addSpecialField()
      newState.unsavedChanges = true;
      return newState;
    })
  }

  saveChanges = () => {
    this.props.upsertCharacter(this.state.character);
    this.props.history.push(`/charpage/${this.state.character.id}`)
    this.setState(prevState => ({
      ...prevState,
      unsavedChanges: false
    }))
  }


  

  render() {
    return (
      <div uk-grid="true">
        <div className="uk-width-1-6">
          <Navigation fieldsets={this.state.character.fieldsets} />
        </div>
        <div className="uk-width-2-3">
          <Content
            availableValues={this.state.character.values}
            createSetValue={this.createSetValue}
            createGetValue={this.getValue}
            character={this.state.character}
            createAddAddableField={this.addAddableField}
            createUpdateAddableField={this.updateAddableField}
            createRemoveAddableField={this.removeAddableField}
          />
        </div>
        <div className="uk-width-1-6">

          <InfoPanel
            character={this.state.character}
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

function mapStateToProps(state: Store) {
  return {
    characters: state.app.characters
  }
}
function mapDispatchToProps(dispatch: Dispatch<Function>) {
  return {
    upsertCharacter: (character: Character) => { dispatch(upsertCharacter(character)) },
  }
}



