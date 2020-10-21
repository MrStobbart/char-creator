import { ObjWithId } from './interfaces';

/**
 * Array that will call the function sideEffects when a new item is pushed.
 */
export class Addable<T extends ObjWithId> {
  protected items: T[] = [];
  public length: number = this.items.length;
  public sideEffects: Function;

  public constructor(sideEffects: Function, ...items: T[]) {
    this.items.push(...items);
    this.sideEffects = sideEffects;
  }

  /**
   * @param item Item to push in the addable
   */
  public push(item: T): any {
    const newArrayLength = this.items.push(item);
    this.update();
    return newArrayLength;
  }

  /**
   * @param id Id of object to remove from the addable
   */
  public remove(id: string) {
    const index = this.items.findIndex(item => item.id === id);
    this.items.splice(index, 1);
    this.update();
  }

  public map(callbackFn: (item: T, index: number, array: T[]) => any): T[] {
    // TODO check if object should be copied here to not change the originals accedentially
    return this.items.map(callbackFn);
  }

  protected update() {
    if (this.sideEffects) {
      this.sideEffects();
    }
    this.length = this.items.length;
  }
}
