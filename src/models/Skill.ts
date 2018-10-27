export class Skill {

  constructor(label: string, attribute: string, sideEffects: Function, cheapSkill?: boolean) {
    this.label = label
    this.attribute = attribute
    this.sideEffects = sideEffects
    this.calculationType = cheapSkill ? 'cheapSkill' : 'skill'
    this.attribute
  }
  label: string
  attribute: string
  calculationType: string
  
  // TODO Check if this is badly inperformant
  sideEffects: Function = () => { }

  private _value: number = 0
  get value(): number {
    return this._value
  }
  set value(value: number) {
    this._value = value
    this.sideEffects()
  }
}