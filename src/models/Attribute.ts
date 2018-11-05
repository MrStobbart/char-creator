import { NumberedProperty } from './../interfaces';


export class Attribute implements NumberedProperty {

  constructor(id: string, label: string, sideEffects: Function) {
    this.id = id
    this.label = label
    this.sideEffects = sideEffects
  }

  // Can't be lower than this TODO set with race
  id: string
  defaultValue = 1;
  label: string
  private _value: number = 1
  sideEffects: Function = () => { }

  get value(): number {
    return this._value
  }
  set value(value: number) {
    if (value >= this.defaultValue) {
      this._value = value
      this.sideEffects(true)
    }
  }

  setValueFromModifier(value: number) {
    this._value = value
    this.sideEffects()
  }

}