import { Addable } from './Addable';
import { Edge, Quality, Modifier } from './interfaces';


export class Qualities<T extends Quality> extends Addable<T>{


  getModifiers = (): Modifier[] => {

    if (this.length > 0) {
      const modifiers = this.map(quality => quality.modifiers)
      return modifiers.reduce((sum, curr) => sum.concat(curr) )
    }
    return []
  }

}