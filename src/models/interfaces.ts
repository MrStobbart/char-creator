export interface CharCreationInformation {
  skillPoints: number
  attributePoints: number
}

export interface Modifier {
  changesProperty: string
  value: number
}


export interface Fieldset {
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
}

export interface Requirement{
  propertyId: string
  value: number
}

export interface Edge extends Quality {
  requirements: Requirement[]
}

export interface Hinderance extends Quality{
}

