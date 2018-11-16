import * as React from 'react';
import { connect, MapDispatchToPropsFactory, MapDispatchToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Action, ActionCreator, Dispatch } from 'redux';

// Actions
import { upsertCharacter } from '../actions';

// Components
import { Navigation } from './Navigation';
import { Content } from './Content';
import { InfoPanel } from './InfoPanel';
import Character from '../../models/savageWorldsCharacter';
import { Store } from '../../rootReducer';
import { CreateUpdateValue, AddQuality, RemoveQuality, SaveChanges } from 'src/App/interfaces';
import { Quality, Requirement, Property } from 'src/models/interfaces';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


export interface CreateCharacterProps extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch{ }

interface State{
  character: Character,
  unsavedChanges: boolean,
}

// The charpage has its own state that will be synced with the redux state on submit. Performance reasons
class CreateCharacterPage extends React.Component<CreateCharacterProps, State> {

  constructor(props: CreateCharacterProps) {
    super(props);
    this.state = {
      character: new Character,
      unsavedChanges: false
    }
  }

  componentDidMount() {
    this.initializeComponent(this.props)
  }


  componentWillReceiveProps(nextProps: CreateCharacterProps) {
    this.initializeComponent(nextProps)
  }

  initializeComponent(props: CreateCharacterProps) {
    const characterId = props.match.params.characterId;

    if (characterId && props.characters) {
      this.loadSelectedCharacter(characterId, props);
    } else {
      this.setState({ character: new Character })
    }
  }

  loadSelectedCharacter(characterId: string, props: CreateCharacterProps) {

    const loadedCharacter = props.characters.find(character => character.id === characterId);

    // If not found there will be an endless spinner - invalid id
    if (loadedCharacter) {
      this.setState({ character: new Character(loadedCharacter) })
    } 
  }


  createUpdateValue: CreateUpdateValue<Property> = (property: string) => (newValue: string | number) => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.character[property].value = newValue
      newState.unsavedChanges = true;
      return newState
    })
  }

  addQuality: AddQuality = (addableFieldId: string, quality: Quality): Requirement[] => {
    // TODO test if this is ok with set state and nested objects
    // Should be ok with calling setState afterwards. Same is true for next function
    const unmetRequirements = this.state.character[addableFieldId].push(quality)

    // Set state only when quality was added
    if (unmetRequirements.length === 0) {
      this.setState({unsavedChanges: true})
    }
    return unmetRequirements
  }

  removeQuality: RemoveQuality = (addableFieldId: string, qualityId: string): void => {
    this.state.character[addableFieldId].remove[qualityId]
    this.setState({unsavedChanges: true})
  } 

  saveChanges: SaveChanges = () => {
    // this.props.upsertCharacter(this.state.character);
    this.props.history.push(`/charpage/${this.state.character.id}`)
    this.setState({ unsavedChanges: false })
  }


  render() {
    return (
      <div uk-grid="true">
        <div className="uk-width-1-6">
          <Navigation fieldsets={this.state.character.fieldsets} />
        </div>
        <div className="uk-width-2-3">
          <Content
            character={this.state.character}
            availableValues={this.state.character.values}
            createUpdateValue={this.createUpdateValue}
            addQuality={this.addQuality}
            removeQuality={this.removeQuality}
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
export default connect<PropsFromState, PropsFromDispatch, void>(mapStateToProps, mapDispatchToProps)(CreateCharacterPage)

interface PropsFromState { characters: Character[] }
interface PropsFromDispatch { upsertCharacter: (character: Character) => void }

function mapStateToProps(state: Store): PropsFromState {
  return {
    characters: state.app.characters
  }
}
function mapDispatchToProps(dispatch: ThunkDispatch<Store, any, Action>): MapDispatchToProps<PropsFromDispatch, void> {
  return {
    upsertCharacter: (character: Character) => dispatch(upsertCharacter(character)),
  }
}



