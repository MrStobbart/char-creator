import { Addable } from './Addable';
import { ObjWithId } from './interfaces';

let referenceValue = 0

it('creates and array', () => {
  const addable = new Addable<ObjWithId>(changeReferenceTo1)
  expect(addable).toBeInstanceOf(Addable)
  expect(addable.sideEffects).toBe(changeReferenceTo1)
})

it('does not mix the added side effects', () => {
  const addable = new Addable<ObjWithId>(changeReferenceTo1)
  const addable2 = new Addable<ObjWithId>(changeReferenceTo2)

  expect(addable.sideEffects).toBe(changeReferenceTo1)
  expect(addable2.sideEffects).toBe(changeReferenceTo2)
})

it('calls the side effects function when an item is pushed into it', () => {

  const addable = new Addable<ObjWithId>(changeReferenceTo1)
  const addable2 = new Addable<ObjWithId>(changeReferenceTo2)
  addable.push({ id: '1' })
  expect(referenceValue).toBe(1)
  addable2.push({ id: '2' }) 
  expect(referenceValue).toBe(2)
})

it('removes the right object from the addable when the remove function is called', () => {
  const addable = new Addable<ObjWithId>(changeReferenceTo1)
  addable.push({ id: '1' })
  addable.push({ id: '2' })
  expect(addable.length).toBe(2)
  addable.remove('2')
  expect(addable.length).toBe(1)
  expect(addable).not.toContain({ id: '2' })
})

it('allows simple mapping as implement with default js arrays', () => {
  const addable = new Addable<ObjWithId>(changeReferenceTo1)
  addable.push({ id: '1' })
  addable.push({ id: '2' })
  addable.push({ id: '3' })
  const mappedAddable = addable.map(item => 'id' + item.id)
  expect(mappedAddable[0]).toBe('id1')
  expect(mappedAddable[1]).toBe('id2')
  expect(mappedAddable[2]).toBe('id3')

})

it('allows the second and third parameter for the mapping function', () => {
  const addable = new Addable<ObjWithId>(changeReferenceTo1)
  addable.push({ id: '1' })
  addable.push({ id: '2' })
  addable.push({ id: '3' })
  const mappedAddable = addable.map((item, index, array) => {
    return `id${item.id}, index${index}, length${array.length}`
  })
  expect(mappedAddable[0]).toBe('id1, index0, length3')
  expect(mappedAddable[1]).toBe('id2, index1, length3')
  expect(mappedAddable[2]).toBe('id3, index2, length3')
})

function changeReferenceTo1() {
  referenceValue = 1
}

function changeReferenceTo2() {
  referenceValue = 2
}


