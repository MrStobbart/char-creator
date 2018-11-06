export interface CharCreationInformation {
  skillPoints: number
  attributePoints: number
}

export interface ObjWithId {
  id: string
}

export interface NumberedProperty extends ObjWithId{
  label: string
  value: number
}

/**
 * @changesProperty string id of delivered data
 */
export interface Modifier {
  changesProperty: string
  value: number
}

export enum FieldTypes{
  readonly = "readonly",
  text = "text",
  addable = "addable",
  number = "number"
}

export interface Fieldset {
  id: string
  title: string
  order: string[]
  type: FieldTypes
}


export interface Quality extends ObjWithId{
  label: string
  information: string
  modifiers: Modifier[]
  requirements: Requirement[]
}

export interface Requirement{
  propertyId: string
  value: number
}

export interface Edge extends Quality{

}

export interface Hinderance extends Quality{
}

export interface DeliveredData extends NumberedProperty{
}
