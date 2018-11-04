export class Attribute {

  constructor(label: string, sideEffects: Function) {
    this.label = label
    this.sideEffects = sideEffects
  }

  // Can't be lower than this TODO set with race
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