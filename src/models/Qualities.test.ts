import { Qualities } from "./Qualities";
import { Quality, Requirement, Edge } from "./interfaces";

let referenceValue = 0

it('creates an object', () => {
  const qualities = new Qualities<Quality>('','',sideEffects)
  expect(qualities).toBeInstanceOf(Qualities)
  expect(qualities.sideEffects).toBe(sideEffects)
})

it('calls the side effects function when an item is pushed into it', () => {

  const addable = new Qualities<Quality>('','',sideEffects)
  const addable2 = new Qualities<Quality>('','',sideEffects2)
  addable.push(quality1)
  expect(referenceValue).toBe(1)
  addable2.push(quality2)
  expect(referenceValue).toBe(2)
})

it('has the function getModifiers always returns something', () => {
  const qualities = new Qualities<Quality>('','',sideEffects)
  expect(qualities.getModifiers()).toEqual([])
  qualities.push(quality1)
  expect(qualities.getModifiers()).toEqual([])
})

it('has the function getModifiers returns an array of all modifiers', () => {
  const qualities = new Qualities<Quality>('','',sideEffects)
  qualities.push(quality1)
  qualities.push(quality2)
  qualities.push(quality3)
  expect(qualities.getModifiers()).toEqual(modifiers)
})

it('returns all unmet requirements', () => {
  const edges = new Qualities<Edge>('','',sideEffects, checkRequirements)

  const unmetRequirements = edges.push(edgeWithMetRequirements)
  expect(unmetRequirements.length).toBe(0)

  const unmetRequirements2 = edges.push(edgeWithUnmetRequirements)
  expect(unmetRequirements2.length).toBe(1)
  expect(unmetRequirements2).toEqual([unmetRequirement])

})


function sideEffects() {
  referenceValue = 1
}

function sideEffects2() {
  referenceValue = 2
}

function checkRequirements(requirements: Requirement[]) {
  let requirementsFulfilled = true
  const unmetRequirements = requirements.filter((requirement) => {
    if (requirement.value > 3) {
      requirementsFulfilled = false
      return true
    }
    return false
  })

  return requirementsFulfilled ? true : unmetRequirements
}

const edgeWithMetRequirements: Edge = {
  id: '1',
  modifiers: [],
  label: 'Label',
  information: 'information',
  requirements: [
    {
      propertyId: 'fighting',
      value: 2
    },
    {
      propertyId: 'strength',
      value: 3
    }
  ]
}


const unmetRequirement: Requirement = {
  propertyId: 'smarts',
  value: 4
}

const edgeWithUnmetRequirements: Edge = {
  id: '2',
  modifiers: [],
  label: 'Label2',
  information: 'information2',
  requirements: [
    unmetRequirement,
    {
      propertyId: 'perception',
      value: 3
    }
  ]
}


const modifiers = [
  { changesProperty: 'fighting', value: 2 },
  { changesProperty: 'parry', value: 1 },
  { changesProperty: 'pace', value: 1 }
]

const quality1: Quality = {
  id: '1',
  label: 'test',
  information: 'test',
  modifiers: [],
  requirements: []
}

const quality2: Quality = {
  id: '2',
  label: 'test',
  information: 'test',
  modifiers: [modifiers[0]],
  requirements: []
}
const quality3: Quality = {
  id: '3',
  label: 'test',
  information: 'test',
  modifiers: [
    modifiers[1],
    modifiers[2],
  ],
  requirements: []
}

