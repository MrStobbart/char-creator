import { Qualities } from './Qualities';
import { Edge } from './interfaces';
import { RequirementsError } from '../Errors/RequirementsError'


export class Edges extends Qualities<Edge>{

  checkRequirements: Function = () => { }

  constructor(sideEffects: Function, checkRequirements: Function, ...items: Edge[]) {
    super(sideEffects, ...items)
    Object.setPrototypeOf(this, Edges.prototype)
    this.checkRequirements = checkRequirements
  }

  /**
   * @throws {RequirementsError} When not all requirements were met
   * @param item Edge to add to the addable
   */
  push(item: Edge): number {
    let fullfillsRequirements = []
    if (this.checkRequirements) {
      fullfillsRequirements = this.checkRequirements(item.requirements)
    }

    if (fullfillsRequirements instanceof Array) {
      throw new RequirementsError('Requirements not met', fullfillsRequirements)  
    }

    const newArrayLength = super.push(item)
    // if (this.sideEffects) {
    //   this.sideEffects()
    // }
    return newArrayLength

  }


}