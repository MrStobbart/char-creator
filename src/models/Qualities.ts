import { Addable } from './Addable';
import { Quality, Modifier, Requirement, ObjWithId } from './interfaces';

export class Qualities<T extends Quality> extends Addable<T> implements ObjWithId {
  public checkRequirements!: Function;
  public id: string;
  public label: string;

  public constructor(id: string, label: string, sideEffects: Function, checkRequirements?: Function, ...items: T[]) {
    super(sideEffects, ...items);
    this.id = id;
    this.label = label;
    if (checkRequirements) {
      this.checkRequirements = checkRequirements;
    }
  }

  /**
   * @param item Edge to add to the addable
   * @returns A list of all unmet requirements that is empy if requirements were met
   */
  public push(item: T): Requirement[] {
    let unmetRequirements = [];
    if (this.checkRequirements) {
      unmetRequirements = this.checkRequirements(item.requirements);
      if (unmetRequirements.length > 0) {
        return unmetRequirements;
      }
    }

    super.push(item);
    return [];
  }

  public getModifiers = (): Modifier[] => {
    if (this.items.length > 0) {
      const modifiers = this.items.map(quality => quality.modifiers);
      return modifiers.reduce((sum, curr) => sum.concat(curr));
    }
    return [];
  };
}
