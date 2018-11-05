export interface CharCreationInformation {
  skillPoints: number
  attributePoints: number
}

/**
 * @changesProperty string id of delivered data
 */
export interface Modifier {
  changesProperty: string
  value: number
}

export interface Fieldset {
  id: string
  title: string
  order: string[]
}

export interface ObjWithId {
  id: string
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

export interface DeliveredData extends ObjWithId{
  label: string
  value: number
}
