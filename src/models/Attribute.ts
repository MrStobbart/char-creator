import { NumberProperty } from './interfaces';

export class Attribute implements NumberProperty {
  public constructor(id: string, label: string, sideEffects: Function) {
    this.id = id;
    this.label = label;
    this.sideEffects = sideEffects;
  }

  // Can't be lower than this TODO set with race
  public id: string;
  public defaultValue = 1;
  public label: string;
  private _value = 1;
  public sideEffects: Function;

  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if (value >= this.defaultValue) {
      this._value = value;
      this.sideEffects(true);
    }
  }

  public setValueFromModifier(value: number) {
    this._value = value;
    this.sideEffects();
  }
}
