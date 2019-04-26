import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Actions
import { upsertCharacter, fetchQualities, fetchCharacter } from '../actions';

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
  const [character, updateCharacter] = useState(new Character());
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO can I move this out of this function?
    const characterId = props.match.params.characterId;
    if (characterId) {
      loadSelectedCharacter(characterId);
    }
  }, [props.match.params.characterId]);

  const loadSelectedCharacter = (characterId: string) => {
    const selectedCharacter = appState.characters.find(character => character.id === characterId);

    if (selectedCharacter) {
      updateCharacter(selectedCharacter);
      setLoading(false);
    } else {
      if (!loading) {
        setLoading(true);
        fetchCharacter(dispatch, appState, characterId);
      }
    }
  };

  const createUpdateValue: CreateUpdateValue<Property> = (property: string) => (
    newValue: string | number
  ) => {
    character[property].value = newValue;
    // TODO does this work or do I need a copy?
    updateCharacter(character);
    setUnsavedChanges(true);
  };

  const addQuality: AddQuality = (addableFieldId: string, quality: Quality): Requirement[] => {
    // TODO test if this is ok with set state and nested objects
    // Should be ok with calling setState afterwards. Same is true for next function
    const unmetRequirements = character[addableFieldId].push(quality);

    // Set state only when quality was added
    if (unmetRequirements.length === 0) {
      setUnsavedChanges(true);
    }
    return unmetRequirements;
  };

  const removeQuality: RemoveQuality = (addableFieldId: string, qualityId: string): void => {
    character[addableFieldId].remove[qualityId];
    setUnsavedChanges(true);
  };

  const saveChanges: SaveChanges = () => {
    upsertCharacter(appState, dispatch, character);
    props.history.push(`/charpage/${character.id}`);
    setUnsavedChanges(false);
  };

  return (
    <div uk-grid='true'>
      <div className='uk-width-1-6'>
        <Navigation fieldsets={character.fieldsets} />
      </div>
      <div className='uk-width-2-3'>
        <Content
          character={character}
          availableValues={character.values}
          createUpdateValue={createUpdateValue}
          addQuality={addQuality}
          removeQuality={removeQuality}
        />
      </div>
      <div className='uk-width-1-6'>
        <InfoPanel
          character={character}
          saveChanges={saveChanges}
          unsavedChanges={unsavedChanges}
        />
      </div>
    </div>
  );
};

export default CreateCharacterPage;
