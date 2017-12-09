import CharSheet, {
  deliveredData,
  parry,
  skills,
  fighting,
  toughness,
  attributes,
  constitution,
  edges,
  hinderances
} from './CharSheet';


import edgesArr from './data/edges.json'
import hinderancesArr from './data/hinderances.json';

it('creates an object', () => {
  const charSheet = new CharSheet();
  expect(charSheet.character).toHaveProperty('id', 'savageWorldsFantasy')

  expect(charSheet).toBeInstanceOf(CharSheet)
})

it('calculates the parry correctly', () => {
  const charSheet = new CharSheet();
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(parry).value).toBe(3)

  charSheet.setValue('skills', 'fighting', 2)
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(parry).value).toBe(5)
})

it('calculates the toughness correctly', () => {
  const charSheet = new CharSheet();
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(toughness).value).toBe(4)

  charSheet.setValue('attributes', 'constitution', 2)
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(toughness).value).toBe(5)
})

it('calculates the available skillpoints', () => {
  const charSheet = new CharSheet();
  expect(charSheet.character.charCreationInformation.skillPoints.value).toBe(50)

  charSheet.setValue('skills', 'fighting', 2)
  charSheet.setValue('skills', 'climbing', 2)
  expect(charSheet.character.charCreationInformation.skillPoints.value).toBe(41)
})

it('calculates the available attribute points', () => {
  const charSheet = new CharSheet();
  
  expect(charSheet.character.charCreationInformation.attributePoints.value).toBe(5)

  charSheet.setValue('attributes', 'strength', 3)
  expect(charSheet.character.charCreationInformation.attributePoints.value).toBe(3)
})

it('adds modifers and edge when an edge is added ', () => {
  const charSheet = new CharSheet();
  charSheet.addSpecial('edges', edgesArr[0].selectables[5])

  expect(charSheet.modifiers).toHaveProperty('charisma', 1)
  expect(charSheet.character.fieldsets.find(edges).selected).toHaveLength(1)
})


it('remove modifers and edge when an edge is removed ', () => {
  const charSheet = new CharSheet();
  charSheet.addSpecial('edges', edgesArr[0].selectables[5])
  charSheet.removeSpecial('edges', edgesArr[0].selectables[5])
  
  
  expect(charSheet.modifiers).not.toHaveProperty('charisma', 1)
  expect(charSheet.character.fieldsets.find(edges).selected).not.toHaveLength(1)
  
})

it('adds modifers and hinderance when an hinderance is added ', () => {
  const charSheet = new CharSheet();
  charSheet.addSpecial('hinderances', hinderancesArr[0].selectables[3])
  
  expect(charSheet.modifiers).toHaveProperty('charisma', -1)
  expect(charSheet.character.fieldsets.find(hinderances).selected).toHaveLength(1)
  
})

it('remove modifers and hinderance when an hinderance is removed ', () => {
  const charSheet = new CharSheet();
  charSheet.addSpecial('hinderances', hinderancesArr[0].selectables[3])
  charSheet.removeSpecial('hinderances', hinderancesArr[0].selectables[3])
  
  expect(charSheet.modifiers).not.toHaveProperty('charisma', -1)
  expect(charSheet.character.fieldsets.find(hinderances).selected).not.toHaveLength(1)
  
})

it('applies modifiers on the character', () => {
  const charSheet = new CharSheet()
  charSheet.addSpecial('edges', edgesArr[0].selectables[5])
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(field => field.id === 'charisma').value).toBe(1)
})

it('merges modifiert correctly', () => {
  const charSheet = new CharSheet()
  charSheet.addSpecial('edges', edgesArr[0].selectables[5])
  charSheet.addSpecial('edges', edgesArr[0].selectables[6])
  charSheet.addSpecial('hinderances', hinderancesArr[0].selectables[3])

  expect(charSheet.modifiers).toHaveProperty('charisma', 1)
  expect(charSheet.character.fieldsets.find(hinderances).selected).toHaveLength(1)
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(field => field.id === 'charisma').value).toBe(1)

})

it('calculates the available edge points', () => {
  const charSheet = new CharSheet()
  charSheet.addSpecial('edges', edgesArr[0].selectables[5])
  charSheet.addSpecial('edges', edgesArr[0].selectables[6])
  charSheet.addSpecial('hinderances', hinderancesArr[0].selectables[3])

  expect(charSheet.character.charCreationInformation.edgePoints.value).toBe(-3)
})