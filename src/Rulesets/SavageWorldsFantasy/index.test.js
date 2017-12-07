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
  const character = new CharSheet();
  expect(character).toHaveProperty('id', 'savageWorldsFantasy')

  expect(character).toBeInstanceOf(CharSheet)
})

it('calculates the parry correctly', () => {
  const character = new CharSheet();
  character.calculatePoints();
  expect(character.fieldsets.find(deliveredData).fields.find(parry).value).toBe(3)
})

it('calculates the parry correctly after an update', () => {
  const character = new CharSheet();
  character.calculatePoints();

  character.fieldsets.find(skills).fields.find(fighting).value = 2
  character.calculatePoints();

  expect(character.fieldsets.find(deliveredData).fields.find(parry).value).toBe(5)
})

it('calculates the toughness correctly', () => {
  const character = new CharSheet();
  character.calculatePoints();
  expect(character.fieldsets.find(deliveredData).fields.find(toughness).value).toBe(4)
})

it('calculates the toughness correctly after an update', () => {
  const character = new CharSheet();
  character.calculatePoints();

  character.fieldsets.find(attributes).fields.find(constitution).value = 2
  character.calculatePoints();

  expect(character.fieldsets.find(deliveredData).fields.find(toughness).value).toBe(5)
})