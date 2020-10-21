import React, { useState } from 'react';
import { MouseEvent } from 'react';
import { Quality } from '../../../../models/interfaces';
import { AddQuality, RemoveQuality } from '../../../../App/interfaces';
import { Qualities } from '../../../../models/Qualities';
import { AutocompleteField } from './AutocompleteField';

export interface AddableFieldProps {
  qualityId: string;
  removeQuality: RemoveQuality;
  addQuality: AddQuality;
  qualities: Qualities<Quality>;
}

export const AddableField = (props: AddableFieldProps) => {
  const options: string[] = []; // TODO all qualities from backend - the ones I already use
  const [warning, updateWarning] = useState<string>();

  const createRemoveQuality = (qualityId: string) => (event: MouseEvent) => {
    event.preventDefault();
    props.removeQuality(props.qualities.id, qualityId);
  };

  // const createAddQuality = (addableFieldId: string) => (value: number) => {};

  return (
    <div>
      <div>
        <div style={{ float: 'left', marginLeft: 10 }}>
          <AutocompleteField addValue={props.addQuality} />
        </div>
      </div>
      <div className="uk-margin">{warning}</div>
      <div className="uk-margin">
        {props.qualities.map(quality => (
          <div key={quality.id} className="uk-margin-small-bottom" style={{ display: 'flex' }}>
            <div>{quality.label}</div>
            <div className="field-remove-button" style={{ float: 'left' }}>
              <button
                className="uk-icon-button"
                uk-icon="icon: close; ratio: 1"
                onClick={createRemoveQuality(quality.id)}
                style={{ marginTop: 2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
