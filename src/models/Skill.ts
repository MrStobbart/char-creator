import { NumberProperty } from './interfaces';

export class Skill implements NumberProperty {
  public id: string;
  public label: string;
  public attribute: string;
  public calculationType: string;

  public constructor(id: string, label: string, attribute: string, sideEffects: Function, cheapSkill?: boolean) {
    this.id = id;
    this.label = label;
    this.attribute = attribute;
    this.sideEffects = sideEffects;
    this.calculationType = cheapSkill ? 'cheapSkill' : 'skill';
    this.attribute = attribute;
  }

  // TODO Check if this is badly inperformant
  public sideEffects: Function;

  private _value = 0;
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    this._value = value;
    this.sideEffects(true);
  }

  public setValueFromModifier(value: number) {
    this._value = value;
    this.sideEffects();
  }
}
