import Character from './savageWorldsCharacter'
import { Modifier, Requirement } from './interfaces'

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
  expect(characterMeetsReqirements).toBe(false)
  character.fighting.value = 2
  character.strength.value = 4
  characterMeetsReqirements = character.checkRequirements(requirements)
  expect(characterMeetsReqirements).toBe(true)
})

xit('adds modifers and edge when an edge is added ', () => {
  const character = new Character();
})


xit('remove modifers and edge when an edge is removed ', () => {
  const character = new Character();

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