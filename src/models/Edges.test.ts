import { Edges } from './Edges';
import { ObjWithId, Edge } from './interfaces';

let referenceValue = 0

it('creates and array', () => {
  const edges = new Edges(changeReferenceTo1, changeReferenceTo2)
  expect(edges).toBeInstanceOf(Array)
  expect(edges.sideEffects).toBe(changeReferenceTo1)
})


function changeReferenceTo1() {
  referenceValue = 1
}

function changeReferenceTo2() {
  referenceValue = 2
}


