// Only import lodash cloneDeep to minimze bundle size
import cloneDeep from 'lodash/cloneDeep'
import emptyCharSheet from './data/emptyCharSheet.json'


export default class CharSheet {

  constructor(character = cloneDeep(emptyCharSheet)) {
    this.character = character
    this.modifiers = {}
  }

  addEdge(edge) {
    // Check if edge can be selected
    if (true) {
      this.character.fieldsets.find(edges).selected.push(edge)
      if (edge.modifiers) {
        for (const key in edge.modifiers) {
          if (edge.modifiers.hasOwnProperty(key)) {
            const modifier = edge.modifiers[key];
            this.modifiers[key] = this.modifiers[key] ? this.modifiers[key] + modifier : modifier
          }
        }
      }
      return true;
    }
    return false
  }

  removeEdge(edgeToRemove) {
    this.character.fieldsets.find(edges).selected = this.character.fieldsets.find(edges).selected.filter(edge => edge.id !== edgeToRemove.id)
    if (edgeToRemove.modifiers) {
      for (const key in edgeToRemove.modifiers) {
        if (edgeToRemove.modifiers.hasOwnProperty(key)) {
          const modifier = edgeToRemove.modifiers[key];
          this.modifiers[key] = this.modifiers[key] - modifier;
        }
      }
    }
  }

  calculatePoints() {
    this.calcParry()
    this.calcToughness()
    this.calcAvailableSkillPoints()
    this.calcAvailableAttributePoints()
  }

  calcParry() {
    const fightingValue = this.character.fieldsets.find(skills).fields.find(fighting).value;
    this.character.fieldsets.find(deliveredData).fields.find(parry).value = (fightingValue * 2 + 2) / 2 + 2;
  }

  calcToughness() {
    const constitutionValue = this.character.fieldsets.find(attributes).fields.find(constitution).value;
    this.character.fieldsets.find(deliveredData).fields.find(toughness).value = (constitutionValue * 2 + 2) / 2 + 2;
  }

  calcCharisma() {
  }

  calcPace() {
  }

  calcAvailableSkillPoints() {
    this.character.charCreationInformation.skillPoints.value = this.character.fieldsets.find(skills).fields
      .reduce((sum, skill) => {
        const attribute = this.character.fieldsets.find(attributes).fields.find(field => field.id === skill.attribute);
        if (skill.calculationType === 'cheapSkill') {
          return sum - calculateSkillPoints(skill.value, attribute.value, 1)
        } else {
          return sum - calculateSkillPoints(skill.value, attribute.value, 2) 
        }
      }, 50)
  }

  calcAvailableAttributePoints() {
    this.character.charCreationInformation.attributePoints.value = this.character.fieldsets.find(attributes).fields
      .reduce((sum, attribute) => sum - attribute.value, 10)
  }

}

function calculateSkillPoints(skillValue, attributeValue, cost) {
  if (skillValue <= attributeValue) {
    return skillValue * cost;
  } else {
    return (attributeValue * cost + (skillValue - attributeValue) * cost * 2);
  }
}

export function deliveredData(fieldset) {
  return fieldset.id === 'deliveredData';
}
export function skills(fieldset) {
  return fieldset.id === 'skills';
}

export function attributes(fieldset) {
  return fieldset.id === 'attributes';
}

export function edges(fieldset) {
  return fieldset.id === 'edges';
}

export function hinderances(fieldset) {
  return fieldset.id === 'hinderances';
}

export function fighting(field) {
  return field.id === 'fighting';
}
export function parry(field) {
  return field.id === 'parry';
}

export function toughness(field) {
  return field.id === 'toughness';
}

export function constitution(field) {
  return field.id === 'constitution';
}
