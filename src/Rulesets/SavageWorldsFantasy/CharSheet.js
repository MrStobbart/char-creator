// Only import lodash cloneDeep to minimze bundle size
import cloneDeep from 'lodash/cloneDeep'
import emptyCharSheet from './data/emptyCharSheet.json'


export default class CharSheet {

  constructor(character = cloneDeep(emptyCharSheet)) {
    this.character = character
    this.modifiers = {}
    this.availableValues = [" ", "W4", "W6", "W8", "W10", "W12"],  
    this.calculateValues()

  }

  setValue(fieldsetId, fieldId, value) {
    
    const fieldsetIndex = this.character.fieldsets.findIndex(fieldset => fieldset.id === fieldsetId)
    if (fieldsetIndex === -1) {
      throw `fieldset ${fieldsetId} not found`
    }
    
    const fieldIndex = this.character.fieldsets[fieldsetIndex].fields.findIndex(field => field.id === fieldId)
    if (fieldIndex === -1) {
      throw `field ${fieldId} not fount in the fieldset ${fieldsetId}`
    }
    
    this.character.fieldsets[fieldsetIndex].fields[fieldIndex].value = value
    
    // Only calculate stuff when a numeric value was changed
    if (fieldsetId !== 'generalInformation') {
      this.calculateValues()
    }
    return true
  }

  getValue(fieldsetId, fieldId) {
    const fieldsetIndex = this.character.fieldsets.findIndex(fieldset => fieldset.id === fieldsetId)
    if (fieldsetIndex === -1) {
      throw `fieldset ${fieldsetId} not found`
      return false;
    }

    const fieldIndex = this.character.fieldsets[fieldsetIndex].fields.findIndex(field => field.id === fieldId)
    if (fieldIndex === -1) {
      throw `field ${fieldId} not fount in the fieldset ${fieldsetId}`
      return false;
    }

    return this.character.fieldsets[fieldsetIndex].fields[fieldIndex].value
  }

  addSpecial(fieldsetId, special) {
    // Check if edge can be selected
    if (true) {
      this.character.fieldsets.find(fieldset => fieldset.id === fieldsetId).selected.push(special)
      if (special.modifiers) {
        for (const key in special.modifiers) {
          if (special.modifiers.hasOwnProperty(key)) {
            const modifier = special.modifiers[key];
            this.modifiers[key] = this.modifiers[key] ? this.modifiers[key] + modifier : modifier
          }
        }
      }
      this.calculateValues()
      return true;
    }
    return false
  }

  removeSpecial(fieldsetId, specialToRemove) {
    this.character.fieldsets.find(fieldset => fieldset.id === fieldsetId).selected = this.character.fieldsets.find(fieldset => fieldset.id === fieldsetId).selected.filter(edge => edge.id !== specialToRemove.id)

    if (specialToRemove.modifiers) {
      for (const key in specialToRemove.modifiers) {
        if (specialToRemove.modifiers.hasOwnProperty(key)) {
          const modifier = specialToRemove.modifiers[key];
          this.modifiers[key] = this.modifiers[key] - modifier;
        }
      }
    }
    this.calculateValues()
  }

  calculateValues() {
    // console.time('calculate values')
    this.calcParry()
    this.calcToughness()
    this.calcCharisma()
    this.calcPace()
    this.calcAvailableSkillPoints()
    this.calcAvailableAttributePoints()
    this.calcAvailableEdgePoints()
    this.applyModifiers() 
    // console.timeEnd('calculate values')
  }

  applyModifiers() {
    let fieldIndex, key

    for (key in this.modifiers) {
      const fieldsetIndex = this.character.fieldsets.findIndex(fieldsetWithField)
      this.character.fieldsets[fieldsetIndex].fields[fieldIndex].value = this.character.fieldsets[fieldsetIndex].fields[fieldIndex].value + this.modifiers[key]
    }

    function fieldsetWithField(fieldset) {
      fieldIndex = fieldset.fields.findIndex(field => field.id === key)
      if (fieldIndex === -1) {
        return false;
      }
      return true;
    }
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
    this.character.fieldsets.find(deliveredData).fields.find(field => field.id === 'charisma').value = 0
  }

  calcPace() {
    this.character.fieldsets.find(deliveredData).fields.find(field => field.id === 'pace').value = 12
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

  calcAvailableEdgePoints() {
    const numberOfEdges = this.character.fieldsets.find(edges).selected.length;
    const hinderancePoints = this.character.fieldsets.find(hinderances).selected.reduce((sum, hinderance) => sum + hinderance.points, 0)
    
    this.character.charCreationInformation.edgePoints.value = hinderancePoints - numberOfEdges * 2
    
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

