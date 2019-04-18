import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Action } from 'redux';

// Actions
import { upsertCharacter, fetchQualities, fetchCharacter } from '../actions';

// Components
import { Navigation } from './Navigation';
import { Content } from './Content';
import { InfoPanel } from './InfoPanel';
import Character from '../../models/savageWorldsCharacter';
import { Store } from '../../rootReducer';
import {
  CreateUpdateValue,
  AddQuality,
  RemoveQuality,
  SaveChanges,
  QualityData,
  AppAction,
} from '../interfaces';
import { Quality, Requirement, Property } from '../../models/interfaces';
import { ThunkDispatch } from 'redux-thunk';

export interface CreateCharacterProps
  extends RouteComponentProps<any>,
    PropsFromState,
    PropsFromDispatch {}

interface State {
  character: Character;
  unsavedChanges: boolean;
  loading: boolean;
}

// The charpage has its own state that will be synced with the redux state on submit. Performance reasons
class CreateCharacterPage extends React.Component<CreateCharacterProps, State> {
  constructor(props: CreateCharacterProps) {
    super(props);
    this.state = {
      character: new Character(),
      unsavedChanges: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.initializeComponent(this.props);
    this.props.fetchQualities();
  }

  componentWillReceiveProps(nextProps: CreateCharacterProps) {
    this.initializeComponent(nextProps);
  }

  initializeComponent(props: CreateCharacterProps) {
    const characterId = props.match.params.characterId;
    if (characterId) {
      this.loadSelectedCharacter(characterId, props);
    } else {
      this.setState({ character: new Character() });
    }
  }

  loadSelectedCharacter(characterId: string, props: CreateCharacterProps) {
    // TODO nothing is found here
    console.log('characters', props.characters);

    const selectedCharacter = props.characters.find(character => character.id === characterId);
    console.log('selected char: ', selectedCharacter);

    if (!selectedCharacter) {
      if (!this.state.loading) {
        this.setState({ loading: true });
        props.fetchCharacter(characterId);
      }
    } else {
      console.log('set character: ', selectedCharacter);

      this.setState({ character: selectedCharacter });
      this.setState({ loading: false });
    }
  }

  createUpdateValue: CreateUpdateValue<Property> = (property: string) => (
    newValue: string | number
  ) => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.character[property].value = newValue;
      newState.unsavedChanges = true;
      return newState;
    });
  };

  addQuality: AddQuality = (addableFieldId: string, quality: Quality): Requirement[] => {
    // TODO test if this is ok with set state and nested objects
    // Should be ok with calling setState afterwards. Same is true for next function
    const unmetRequirements = this.state.character[addableFieldId].push(quality);

    // Set state only when quality was added
    if (unmetRequirements.length === 0) {
      this.setState({ unsavedChanges: true });
    }
    return unmetRequirements;
  };

  removeQuality: RemoveQuality = (addableFieldId: string, qualityId: string): void => {
    this.state.character[addableFieldId].remove[qualityId];
    this.setState({ unsavedChanges: true });
  };

  saveChanges: SaveChanges = () => {
    this.props.upsertCharacter(this.state.character);
    this.props.history.push(`/charpage/${this.state.character.id}`);
    this.setState({ unsavedChanges: false });
  };

  render() {
    return (
      <div uk-grid='true'>
        <div className='uk-width-1-6'>
          <Navigation fieldsets={this.state.character.fieldsets} />
        </div>
        <div className='uk-width-2-3'>
          <Content
            character={this.state.character}
            availableValues={this.state.character.values}
            createUpdateValue={this.createUpdateValue}
            addQuality={this.addQuality}
            removeQuality={this.removeQuality}
          />
        </div>
        <div className='uk-width-1-6'>
          <InfoPanel
            character={this.state.character}
            saveChanges={this.saveChanges}
            unsavedChanges={this.state.unsavedChanges}
          />
        </div>
      </div>
    );
  }
}

/**
 * CharPageContainer
 */
export default connect<PropsFromState, PropsFromDispatch, void>(
  mapStateToProps,
  mapDispatchToProps
)(CreateCharacterPage);

interface PropsFromState {
  characters: Character[];
  qualities: QualityData;
}
interface PropsFromDispatch {
  upsertCharacter: (character: Character) => void;
  fetchQualities: () => void;
  fetchCharacter: (id: string) => void;
}

function mapStateToProps(state: Store): PropsFromState {
  return {
    characters: state.app.characters,
    qualities: state.app.qualities,
  };
}
function mapDispatchToProps(dispatch: ThunkDispatch<Store, any, AppAction>): PropsFromDispatch {
  return {
    upsertCharacter: (character: Character) => dispatch(upsertCharacter(character)),
    fetchQualities: () => dispatch(fetchQualities()),
    fetchCharacter: id => dispatch(fetchCharacter(id)),
  };
}
