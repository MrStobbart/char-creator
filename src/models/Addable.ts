import { ObjWithId, Edge, Requirement } from './interfaces';

/**
 * Array that will call the function sideEffects when a new item is pushed.
 */
export class Addable<T extends ObjWithId> {

  protected value: T[] = []
  length: number = this.value.length
  sideEffects: Function = () => { }

  constructor(sideEffects: Function, ...items: T[]) {
    this.value.push(...items)
    this.sideEffects = sideEffects
  }

  /**
   * @param item Item to push in the addable
   */
  push(item: T): any {
    const newArrayLength = this.value.push(item)
    this.update()
    return newArrayLength
  }

  /**
   * @param id Id of object to remove from the addable
   */
  remove(id: string) {
    const index = this.value.findIndex(item => item.id === id)
    this.value.splice(index, 1)
    this.update()
  }

  map(callbackFn: (item: T, index: number, array: T[]) => any): T[] {
    // TODO check if object should be copied here to not change the originals accedentially
    return this.value.map(callbackFn)
  }

  protected update() {
    if (this.sideEffects) {
      this.sideEffects()
    }
    this.length = this.value.length
  }

}
