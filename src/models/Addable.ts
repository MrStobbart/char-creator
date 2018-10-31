import { ObjWithId, Edge, Requirement } from './interfaces';

/**
 * Array that will call the function sideEffects when a new item is pushed.
 */
export class Addable<T extends ObjWithId> extends Array<T> {

  sideEffects: Function = () => { }

  constructor(sideEffects: Function, ...items: T[]) {
    super(...items)
    Object.setPrototypeOf(this, Addable.prototype)
    this.sideEffects = sideEffects
    // Prototype of the object can otherwise be lost
  }

  /**
   * @param item Item to push in the addable
   */
  push(item: T): number {
    const newArrayLength = super.push(item)
    if (this.sideEffects) {
      this.sideEffects()
    }
    return newArrayLength
  }

  /**
   * @param id Id of object to remove from the addable
   */
  remove(id: string) {
    const index = this.findIndex(item => item.id === id)
    this.splice(index, 1)
  }
}
