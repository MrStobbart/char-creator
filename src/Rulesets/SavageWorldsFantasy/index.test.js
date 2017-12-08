import CharSheet, {
  deliveredData,
  parry,
  skills,
  fighting,
  toughness,
  attributes,
  constitution,
} from './index';

it('creates an object', () => {
  const charSheet = new CharSheet();
  expect(charSheet.character).toHaveProperty('id', 'savageWorldsFantasy')

  expect(charSheet).toBeInstanceOf(CharSheet)
})

it('calculates the parry correctly', () => {
  const charSheet = new CharSheet();
  charSheet.calculatePoints();
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(parry).value).toBe(3)

  charSheet.character.fieldsets.find(skills).fields.find(fighting).value = 2
  charSheet.calculatePoints();

  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(parry).value).toBe(5)
})

it('calculates the toughness correctly', () => {
  const charSheet = new CharSheet();
  charSheet.calculatePoints();
  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(toughness).value).toBe(4)

  charSheet.character.fieldsets.find(attributes).fields.find(constitution).value = 2
  charSheet.calculatePoints();

  expect(charSheet.character.fieldsets.find(deliveredData).fields.find(toughness).value).toBe(5)
})

it('calculates the available skillpoints', () => {
  const charSheet = new CharSheet();
  charSheet.calculatePoints();
  expect(charSheet.character.charCreationInformation.skillPoints.value).toBe(50)

  charSheet.character.fieldsets.find(skills).fields.find(fighting).value = 2
  charSheet.character.fieldsets.find(skills).fields.find(skill => skill.id === 'climbing').value = 2
  charSheet.calculatePoints();
  expect(charSheet.character.charCreationInformation.skillPoints.value).toBe(41)
})

it('calculates the available attribute points', () => {
  const charSheet = new CharSheet();
  charSheet.calculatePoints();
  expect(charSheet.character.charCreationInformation.attributePoints.value).toBe(5)

  charSheet.character.fieldsets.find(attributes).fields.find(attribute => attribute.id == 'strength').value = 3
  charSheet.calculatePoints();
  expect(charSheet.character.charCreationInformation.attributePoints.value).toBe(3)
})

it('applies modifiers on values')

it('calculates the available edge points')