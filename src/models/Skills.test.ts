import { Skill } from "./Skill";

let referenceValue = 0
it('creates an object', () => {
  const skill = new Skill('1', 'label', 'attribute', changeRefernceTo1)
  expect(skill).toBeInstanceOf(Skill)
})

it('calls the side effects function when the value changes', () => {
  const skill = new Skill('2', 'label', 'attribute', changeRefernceTo1)
  skill.value = 2
  expect(referenceValue).toBe(1)
})

function changeRefernceTo1() {
  referenceValue = 1
}