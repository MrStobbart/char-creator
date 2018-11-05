import { NumberedProperty } from './../interfaces';

export class Skill implements NumberedProperty {

  id: string
  label: string
  attribute: string
  calculationType: string
  
  constructor(id: string, label: string, attribute: string, sideEffects: Function, cheapSkill?: boolean) {
    this.id = id
    this.label = label
    this.attribute = attribute
    this.sideEffects = sideEffects
    this.calculationType = cheapSkill ? 'cheapSkill' : 'skill'
    this.attribute
  }
  
  // TODO Check if this is badly inperformant
  sideEffects: Function = () => { }

  private _value: number = 0
  get value(): number {
    return this._value
  }
  set value(value: number) {
    this._value = value
    this.sideEffects(true)
  }

  setValueFromModifier(value: number) {
    this._value = value
    this.sideEffects()
  }
}