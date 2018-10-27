import { ObjWithId } from './interfaces';


export class Addable<T extends ObjWithId> extends Array<T>{

  sideEffects: Function = () => { }

  // Because otherwise Addable would have the Array prototype and not the desired Addable prototype
  private constructor(items?: Array<T>) {
    super(...items)
  }

  static create<T extends ObjWithId>(sideEffects: Function): Addable<T> {
    const addable = Object.create(Addable.prototype);
    addable.sideEffects = sideEffects
    return addable
  }

  push(items: T) {
    if (this.sideEffects) {
      this.sideEffects()
    }
    
    return super.push(items)
  }

  // Is this inefficient
  remove(id: string) {
    const index = this.findIndex(item => item.id === id)
    this.splice(index, 1)
  }
}