import { Property, Requirement, Quality, Edge, Hinderance } from '../models/interfaces';

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
export interface QualityData {
  edges: Edge[];
  hindrances: Hinderance[];
}

export interface ApiResponse {
  status: 'success' | 'fail';
  data: any;
}
