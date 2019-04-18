export interface CharCreationInformation {
  skillPoints: number;
  attributePoints: number;
}

export interface ObjWithId {
  id: string;
}

export interface Property extends ObjWithId {
  label: string;
  value: number | string;
}

export interface NumberProperty extends Property {
  value: number;
  default?: number;
}

export interface TextProperty extends Property {
  value: string;
}

export interface CharProperty extends ObjWithId {
  value: number | string;
}

export interface CharData {
  _id: string;
  data: CharProperty[];
}

/**
 * @changesProperty string id of delivered data
 */
export interface Modifier {
  changesProperty: string;
  value: number;
}

export type FieldTypes = 'readonly' | 'text' | 'addable' | 'number';

export interface FieldGroup {
  id: string;
  title: string;
  order: string[];
  type: FieldTypes;
}

export interface Quality extends ObjWithId {
  label: string;
  information: string;
  modifiers: Modifier[];
  requirements: Requirement[];
}

export interface Requirement {
  propertyId: string;
  value: number;
}

export interface Edge extends Quality {}

export interface Hinderance extends Quality {}

export interface DeliveredData extends NumberProperty {}
