import { Addable } from './Addable';
import { ObjWithId } from './interfaces';

let referenceValue = 0

it('creates and array', () => {
  const addable = Addable.create<ObjWithId>(changeReferenceTo1)
  expect(addable).toBeInstanceOf(Array)
  expect(addable.sideEffects).toBe(changeReferenceTo1)
})

it('does not mix the added side effects', () => {
  const addable = Addable.create<ObjWithId>(changeReferenceTo1)
  const addable2 = Addable.create<ObjWithId>(changeReferenceTo2)

  expect(addable.sideEffects).toBe(changeReferenceTo1)
  expect(addable2.sideEffects).toBe(changeReferenceTo2)
})

it('calls the side effects function when an item is pushed into it', () => {

  const addable = Addable.create<ObjWithId>(changeReferenceTo1)
  const addable2 = Addable.create<ObjWithId>(changeReferenceTo2)
  addable.push({ id: '1' })
  expect(referenceValue).toBe(1)
  addable2.push({ id: '2' }) 
  expect(referenceValue).toBe(2)
})

it('removes the right object from the addable when the remove function is called', () => {
  const addable = Addable.create<ObjWithId>(changeReferenceTo1)
  addable.push({ id: '1' })
  addable.push({ id: '2' })
  expect(addable.length).toBe(2)
  addable.remove('2')
  expect(addable.length).toBe(1)
  expect(addable).not.toContain({ id: '2' })
})

function changeReferenceTo1() {
  referenceValue = 1
}

function changeReferenceTo2() {
  referenceValue = 2
}


