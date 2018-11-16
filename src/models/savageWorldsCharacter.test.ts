import Character from './savageWorldsCharacter'
import { Requirement, Edge, Hinderance, Modifier } from './interfaces'

it('creates an object', () => {
  const character = new Character();
  expect(character).toBeInstanceOf(Character)
})

it('calculates the parry correctly', () => {
  const character = new Character();
  expect(character.parry.value).toBe(3)

  character.fighting.value = 2
  expect(character.parry.value).toBe(5)
})

it('calculates the toughness correctly', () => {
  const character = new Character();
  expect(character.toughness.value).toBe(4)

  character.vigor.value = 3
  expect(character.toughness.value).toBe(6)
})

it('calculates the available skillpoints', () => {
  const character = new Character();
  expect(character.skillPoints.value).toBe(50)

  character.fighting.value = 2
  expect(character.skillPoints.value).toBe(44)
  character.etiquette.value = 1
  expect(character.skillPoints.value).toBe(43)
  character.riding.value = 3
  expect(character.skillPoints.value).toBe(38)
})

it('calculates the available attribute points', () => {
  const character = new Character();

  expect(character.attributePoints.value).toBe(5)

  character.strength.value = 3
  expect(character.attributePoints.value).toBe(3)
})

it('generates different ids for different instances of the class', () => {
  const character1 = new Character();
  const character2 = new Character();
  const character3 = new Character();
  expect(character1.id).not.toBe(character2.id)
  expect(character2.id).not.toBe(character3.id)
  expect(character1.id).not.toBe(character3.id)
})

it('calculates the requirements correctly', () => {
  const character = new Character()
  const requirements: Requirement[] = [
    {
      propertyId: 'fighting',
      value: 2
    },
    {
      propertyId: 'strength',
      value: 3
    }
  ]
  
  character.fighting.value = 2
  character.strength.value = 1
  let unmetRequirements = character.checkRequirements(requirements)
  expect(unmetRequirements.length).toBe(1)
  character.fighting.value = 2
  character.strength.value = 4
  unmetRequirements = character.checkRequirements(requirements)
  expect(unmetRequirements.length).toBe(0)
})

it('adds modifers and edge when an edge is added ', () => {
  const character = new Character();
  character.smarts.value = 5
  character.fighting.value = 3
  character.strength.value = 3
  character.perception.value = 3

  character.edges.push(edgeWithMetRequirements)
  character.edges.push(edgeWithUnmetRequirements)

  expect(character.edges.getModifiers()).toEqual(modifiers)
  expect(character.edges.length).toBe(2)

})


it('remove modifers and edge when an edge is removed ', () => {
  const character = new Character();
  character.smarts.value = 5
  character.fighting.value = 3
  character.strength.value = 3
  character.perception.value = 3
  character.edges.push(edgeWithMetRequirements)
  character.edges.push(edgeWithUnmetRequirements)

  expect(character.edges.getModifiers()).toEqual(modifiers)
  expect(character.edges.length).toBe(2)
  character.edges.remove('1')
  character.edges.remove('2')
  expect(character.edges.length).toBe(0)
  expect(character.edges.getModifiers()).toEqual([])
})


it('adds modifers and hinderance when an hinderance is added ', () => {
  const character = new Character();
  character.hinderances.push(hinderance)
  expect(character.toughness.value).toBe(6)
  expect(character.parry.value).toBe(4)
  expect(character.pace.value).toBe(1)
})

it('remove modifers and hinderance when an hinderance is removed ', () => {
  const character = new Character();
  character.hinderances.push(hinderance)
  expect(character.toughness.value).toBe(6)
  expect(character.parry.value).toBe(4)
  expect(character.pace.value).toBe(1)
  character.hinderances.remove('hinderance')
  expect(character.toughness.value).toBe(4)
  expect(character.parry.value).toBe(3)
  expect(character.pace.value).toBe(0)
})

xit('adds modifers and hinderance when an hinderance is added ', () => {
  const character = new Character();
})

xit('remove modifers and hinderance when an hinderance is removed ', () => {
  const character = new Character();

})

xit('applies modifiers on the character', () => {
  const character = new Character()
})

xit('calculates the available edge points', () => {
  const character = new Character()
})


const modifiers: Modifier[] = [
  { changesProperty: 'toughness', value: 2 },
  { changesProperty: 'parry', value: 1 },
  { changesProperty: 'pace', value: 1 }
]

const unmetRequirement: Requirement = {
  propertyId: 'smarts',
  value: 4
}

const edgeWithMetRequirements: Edge = {
  id: '1',
  modifiers: [
    modifiers[0],
    modifiers[1],
  ],
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

const edgeWithUnmetRequirements: Edge = {
  id: '2',
  modifiers: [
    modifiers[2]
  ],
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

const hinderance: Hinderance = {
  id: 'hinderance',
  label: 'Hinderance',
  information: 'Lorem Ipsum',
  modifiers: modifiers,
  requirements: []

}


