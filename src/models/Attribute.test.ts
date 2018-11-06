import { Attribute } from "./Attribute";

let referenceValue = 0
it('creates an object', () => {
  const attribute = new Attribute('1', 'label', changeRefernceTo1)
  expect(attribute).toBeInstanceOf(Attribute)
})

it('calls the side effects function when the value changes', () => {
  const attribute = new Attribute('2', 'label', changeRefernceTo1)
  attribute.value = 2
  expect(referenceValue).toBe(1)
})

function changeRefernceTo1() {
  referenceValue = 1
}