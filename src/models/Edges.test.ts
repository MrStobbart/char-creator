import { Edges } from './Edges';
import { ObjWithId, Edge, Requirement } from './interfaces';
import { RequirementsError } from "../Errors/RequirementsError";

let referenceValue = 0

it('creates an object ', () => {
  const edges = new Edges(sideEffects, checkRequirements)
  expect(edges.sideEffects).toBe(sideEffects)
  expect(edges).toBeInstanceOf(Edges)
})

it('throws an RequirementsError when at least one requirement was not met', () => {
  const edges = new Edges(sideEffects, checkRequirements)

  let newEdgesLength = 0
  try {
    newEdgesLength = edges.push(edgeWithMetRequirements)
    expect(newEdgesLength).toBe(1)
  } catch (error) {
    // Expect to not be called
    expect(false).toBe(true)
  }
  
  try {
    newEdgesLength = edges.push(edgeWithUnmetRequirements)
  } catch (error) {
    if (error instanceof RequirementsError) {
      expect(error.notMetRequirements).toEqual([unmetRequirement])
      // No new item was pushed
      expect(newEdgesLength).toBe(1)
    }
    
  }
  

})


function sideEffects() {
  referenceValue = 1
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


