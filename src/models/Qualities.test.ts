import { Qualities } from "./Qualities";
import { Quality } from "./interfaces";

it('creates and array', () => {
  const qualities = new Qualities<Quality>(mockFunction)
  expect(qualities).toBeInstanceOf(Array)
})

it('has the function getModifiers always returns something', () => {
  const qualities = new Qualities<Quality>(mockFunction)
  expect(qualities.getModifiers()).toEqual([])
  qualities.push(quality1)
  expect(qualities.getModifiers()).toEqual([])
})

it('has the function getModifiers returns an array of all modifiers', () => {
  const qualities = new Qualities<Quality>(mockFunction)
  qualities.push(quality1)
  qualities.push(quality2)
  qualities.push(quality3)
  expect(qualities.getModifiers()).toEqual(modifiers)
})


function mockFunction() {
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
  modifiers: []
}

const quality2: Quality = {
  id: '2',
  label: 'test',
  information: 'test',
  modifiers: [modifiers[0]]
}
const quality3: Quality = {
  id: '3',
  label: 'test',
  information: 'test',
  modifiers: [
    modifiers[1],
    modifiers[2],
  ]
}

