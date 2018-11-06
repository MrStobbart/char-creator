export interface CharCreationInformation {
  skillPoints: number
  attributePoints: number
}

export interface ObjWithId {
  id: string
}

export interface Property extends ObjWithId{
  label: string
  value: number | string
}

export interface NumberProperty extends Property{
  value: number
  default?: number
}

export interface TextProperty extends Property {
  value: string
}

/**
 * @changesProperty string id of delivered data
 */
export interface Modifier {
  changesProperty: string
  value: number
}

export type FieldTypes = "readonly" | "text" | "addable" | "number"

export interface FieldGroup {
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

export interface DeliveredData extends NumberProperty{
}

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