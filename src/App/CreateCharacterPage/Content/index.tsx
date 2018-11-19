import * as React from 'react';
import { FieldGroupComponent } from './FieldGroupComponent';
import './index.css';
import SavageWorldsCharacter from 'src/models/savageWorldsCharacter';
import { Property } from 'src/models/interfaces';
import { CreateUpdateValue, AddQuality, RemoveQuality, QualityData } from 'src/App/interfaces';

export interface ContentProps{
  qualityData: QualityData
  character: SavageWorldsCharacter,
  availableValues: string[]
  createUpdateValue: CreateUpdateValue<Property>,
  addQuality: AddQuality
  removeQuality: RemoveQuality
}

export function Content(props: ContentProps) {

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <form className="uk-form-horizontal">
        {props.character.fieldsets.map(fieldset =>
          <FieldGroupComponent
            qualityData={props.qualityData}
            character={props.character}
            key={fieldset.id}
            fieldset={fieldset}
            availableValues={props.availableValues}
            createUpdateValue={props.createUpdateValue}
            addQuality={props.addQuality}
            removeQuality={props.removeQuality}
          />
        )}
      </form>
    </div>
  )
  
}