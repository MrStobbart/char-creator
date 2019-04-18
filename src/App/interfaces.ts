import { Property, Requirement, Quality, Edge, Hinderance } from '../models/interfaces';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Store } from '../rootReducer';

export interface CreateUpdateValue<T extends Property> {
  (property: string): UpdateValue<T>;
}

export interface UpdateValue<T extends Property> {
  (newValue: T['value']): void;
}

export interface AddQuality {
  (addableFieldId: string, quality: Quality): Requirement[];
}

export interface RemoveQuality {
  (addableFieldId: string, qualityId: string): void;
}

export interface SaveChanges {
  (): void;
}

export interface AppAction<TPayload = any> extends Action<string> {
  payload?: TPayload;
  error?: string;
}

export interface ThunkResult<TResult, TResultActionPayload>
  extends ThunkAction<TResult, Store, void, AppAction<TResultActionPayload>> {}

export interface QualityData {
  edges: Edge[];
  hinderances: Hinderance[];
}
