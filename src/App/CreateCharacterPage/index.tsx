import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Actions
import { upsertCharacter, fetchCharacter } from '../actions';

// Components
import { Navigation } from './Navigation';
import { Content } from './Content';
import { InfoPanel } from './InfoPanel';
import Character from '../../models/savageWorldsCharacter';
import { CreateUpdateValue, AddQuality, RemoveQuality, SaveChanges } from '../interfaces';
import { Quality, Requirement, Property } from '../../models/interfaces';
import { useAppState } from '../appStateHook';

export interface CreateCharacterProps extends RouteComponentProps<any> {}

const CreateCharacterPage = (props: CreateCharacterProps) => {
  const [appState, dispatch] = useAppState();

  // Must be nested so it can be shallow copied (shallow copy for instance of character class is not possible)
  const [state, setState] = useState({ character: new Character() });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  const characterId = props.match.params.characterId;

  const loadSelectedCharacter = useCallback(
    (characterId: string) => {
      const selectedCharacter = appState.characters.find(character => character.id === characterId);

      if (selectedCharacter) {
        setState({ character: selectedCharacter });
        setLoading(false);
      } else {
        if (!loading) {
          setLoading(true);
          fetchCharacter(dispatch, appState, characterId);
        }
      }
    },
    [appState, dispatch, loading],
  );

  useEffect(() => {
    if (characterId) {
      loadSelectedCharacter(characterId);
    }
  }, [characterId, loadSelectedCharacter]);

  const createUpdateValue: CreateUpdateValue<Property> = (property: string) => (newValue: string | number) => {
    const newState = { ...state };
    newState.character[property].value = newValue;
    setState(newState);
    setUnsavedChanges(true);
  };

  const addQuality: AddQuality = (addableFieldId: string, quality: Quality): Requirement[] => {
    // TODO test if this is ok with set state and nested objects
    // Should be ok with calling setState afterwards. Same is true for next function
    const unmetRequirements = state.character[addableFieldId].push(quality);

    // Set state only when quality was added
    if (unmetRequirements.length === 0) {
      setUnsavedChanges(true);
    }
    return unmetRequirements;
  };

  const removeQuality: RemoveQuality = (addableFieldId: string, qualityId: string): void => {
    state.character[addableFieldId].remove(qualityId);
    setUnsavedChanges(true);
  };

  const saveChanges: SaveChanges = () => {
    upsertCharacter(appState, dispatch, state.character);
    props.history.push(`/charpage/${state.character.id}`);
    setUnsavedChanges(false);
  };

  console.log(state);

  return (
    <div uk-grid="true">
      <div className="uk-width-1-6">
        <Navigation fieldsets={state.character.fieldsets} />
      </div>
      <div className="uk-width-2-3">
        <Content
          character={state.character}
          availableValues={state.character.values}
          createUpdateValue={createUpdateValue}
          addQuality={addQuality}
          removeQuality={removeQuality}
        />
      </div>
      <div className="uk-width-1-6">
        <InfoPanel character={state.character} saveChanges={saveChanges} unsavedChanges={unsavedChanges} />
      </div>
    </div>
  );
};

export default CreateCharacterPage;
