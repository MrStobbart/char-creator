import { Qualities } from './Qualities';
import { Edge } from './interfaces';
import { RequirementsError } from '../Errors/RequirementsError'


export class Edges extends Qualities<Edge>{

  checkRequirements: Function = () => { }

  constructor(sideEffects: Function, checkRequirements: Function, ...items: Edge[]) {
    super(sideEffects, ...items)
    Object.setPrototypeOf(this, Qualities.prototype)
    this.sideEffects = sideEffects
    this.checkRequirements = checkRequirements
  }

  /**
   * @throws {RequirementsError} when one or more requirements were not met
   * @param edge Edge to add to the addable
   */
  push(edge: Edge): number {
    let fullfillsRequirements = false
    if (this.checkRequirements) {
      fullfillsRequirements = this.checkRequirements(edge.requirements)
    }

    if (fullfillsRequirements) {
      const newArrayLength = super.push(edge)
      if (this.sideEffects) {
        this.sideEffects()
      }
      return newArrayLength
    }

    // TODO make a proper class for this 
    throw "Requirements not met";


    return this.length
  }


}