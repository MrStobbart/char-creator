export class Attribute {

  constructor(label: string, sideEffects: Function) {
    this.label = label
    this.sideEffects = sideEffects
  }

  label: string
  private _value: number = 1
  sideEffects: Function = () => { }

  get value(): number {
    return this._value
  }
  set value(value: number) {
    this._value = value
    this.sideEffects()
  }

}