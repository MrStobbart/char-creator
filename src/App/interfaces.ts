import { Property, Requirement, Quality } from 'src/models/interfaces';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Store } from '../rootReducer';


export interface CreateUpdateValue<T extends Property>{
  (property: string): UpdateValue<T>
}

export interface UpdateValue<T extends Property>{
  (newValue: T["value"]): void
}

export interface AddQuality{
  (addableFieldId: string, quality: Quality): Requirement[]
}

export interface RemoveQuality{
  (addableFieldId: string, qualityId: string): void
}

export interface SaveChanges{
  (): void
}


export interface CustomAction<TPayload = void> extends Action<string> {
  payload?: TPayload
  error?: string
}

export type ThunkResult<TResult, TResultActionPayload> = ThunkAction<TResult, Store, void, CustomAction<TResultActionPayload>>
