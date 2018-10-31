import Character from './savageWorldsCharacter'
import { Modifier, Requirement, Edge } from './interfaces'

it('creates an object', () => {
  const character = new Character();
  expect(character).toBeInstanceOf(Character)
})

it('calculates the parry correctly', () => {
  const character = new Character();
  expect(character.parry).toBe(3)

  character.fighting.value = 2
  expect(character.parry).toBe(5)
})

it('calculates the toughness correctly', () => {
  const character = new Character();
  expect(character.toughness).toBe(4)

  character.vigor.value = 3
  expect(character.toughness).toBe(6)
})

it('calculates the available skillpoints', () => {
  const character = new Character();
  expect(character.charCreationInformation.skillPoints).toBe(50)

  character.fighting.value = 2
  expect(character.charCreationInformation.skillPoints).toBe(44)
  character.etiquette.value = 1
  expect(character.charCreationInformation.skillPoints).toBe(43)
  character.riding.value = 3
  expect(character.charCreationInformation.skillPoints).toBe(38)
})

it('calculates the available attribute points', () => {
  const character = new Character();

  expect(character.charCreationInformation.attributePoints).toBe(5)

  character.strength.value = 3
  expect(character.charCreationInformation.attributePoints).toBe(3)
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
  let characterMeetsReqirements = character.checkRequirements(requirements)
  expect(characterMeetsReqirements).not.toBe(true)
  character.fighting.value = 2
  character.strength.value = 4
  characterMeetsReqirements = character.checkRequirements(requirements)
  expect(characterMeetsReqirements).toBe(true)
})

it('adds modifers and edge when an edge is added ', () => {
  const character = new Character();
  character.smarts.value = 5
  character.fighting.value = 3
  character.strength.value = 3
  character.perception.value = 3
  try {
    character.edges.push(edgeWithMetRequirements)
  } catch (error) {
    expect(false).toBe(true)
  }
  try {
    character.edges.push(edgeWithUnmetRequirements)
  } catch (error) {
    expect(false).toBe(true)
  }

  expect(character.edges.getModifiers()).toEqual(modifiers)
  expect(character.edges.length).toBe(2)

})


it('remove modifers and edge when an edge is removed ', () => {
  const character = new Character();
  character.smarts.value = 5
  character.fighting.value = 3
  character.strength.value = 3
  character.perception.value = 3
  try {
    character.edges.push(edgeWithMetRequirements)
  } catch (error) {
    expect(false).toBe(true)
  }
  try {
    character.edges.push(edgeWithUnmetRequirements)
  } catch (error) {
    expect(false).toBe(true)
  }

  expect(character.edges.getModifiers()).toEqual(modifiers)
  expect(character.edges.length).toBe(2)
  character.edges.remove('1')
  character.edges.remove('2')
  expect(character.edges.length).toBe(0)
  expect(character.edges.getModifiers()).toEqual([])
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

xit('merges modifiert correctly', () => {
  const character = new Character()
})

xit('calculates the available edge points', () => {
  const character = new Character()
})


const modifiers = [
  { changesProperty: 'fighting', value: 2 },
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


