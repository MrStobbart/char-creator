import * as shortid from 'shortid';
import { CharCreationInformation, Modifier, ObjWithId, Fieldset, Edge, Hinderance, Requirement } from './interfaces';
import { Skill } from './Skill';
import { Attribute } from './Attribute';
import { Qualities} from './Qualities';

export default class SavageWorldsCharacter{

  
  equipment: {
    weapons: []
    armor: []
    gear: []
    money: number
  }

  constructor(json?: any) {

    if (json) {
      this.loadCharacterData(json)
    }
    
    this.calculateData()
    this.applyAllModifiers()
  }

  loadCharacterData = (json: any) => {
    // TODO load the character data from json into the class
  }

  values = ["W4 - 2", "W4", "W6", "W8", "W10", "W12"]

  charCreationInformation: CharCreationInformation = {
    skillPoints: 50,
    attributePoints: 10
  }

  private modifiers: Modifier[] = []


  calculateData = () => {
    this.calcDeliveredData()
    this.calcAvailableSkillPoints()
    this.calcAvailableAttributePoints()
  }

  calcDeliveredData = () => {
    this.parry = (this.fighting.value * 2 + 2) / 2 + 2
    this.toughness = (this.vigor.value * 2 + 2) / 2 + 2
    this.pace = this.basePace
    this.charisma = this.baseCharisma
  }

  addModifer = (modifier: Modifier) => {
    this.modifiers.push(modifier)
  }

  removeModifier = (modifierToRemove: Modifier) => {
    this[modifierToRemove.changesProperty] = this[modifierToRemove.changesProperty] - modifierToRemove.value
    this.modifiers = this.modifiers.filter(modifier => modifierToRemove !== modifier)
  }

  applyAllModifiers = () => {
    this.modifiers.forEach(modifier => {
      this[modifier.changesProperty] = this[modifier.changesProperty] + modifier.value
    });

  }


  /**
   * @param requirements An array of all requirements that have to be met
   * @returns Either an array of all requirements that were not met that is empy if all were met
   */
  checkRequirements = (requirements: Requirement[]): Requirement[] => {
    let requirementsFulfilled = true
    const unmetRequirements = requirements.filter((requirement) => {
      if (requirement.value > this[requirement.propertyId].value) {
        requirementsFulfilled = false
        return true
      } 
      return false
    })

    console.log('unmetRequirements', unmetRequirements, requirements)
    return requirementsFulfilled ? [] : unmetRequirements
  }

  // TODO Remove modifier again while calculating skillpoints?
  calcAvailableSkillPoints = () => {
    this.charCreationInformation.skillPoints = this.skills.order
      .reduce((sum, skillName) => {
        const skill: Skill = this[skillName]
        const skillValueWithoutModifiers = this.modifiers.reduce((sum, modifier) => {
          if (modifier.changesProperty === skillName) {
            return sum - modifier.value
          }
          return sum
        }, skill.value)
        const attribute = this[skill.attribute]
        if (skill.calculationType === 'cheapSkill') {
          return sum - calculateSkillPoints(skillValueWithoutModifiers, attribute.value, 1)
        } else {
          return sum - calculateSkillPoints(skillValueWithoutModifiers, attribute.value, 2)
        }
      }, 50)
  }

  calcAvailableAttributePoints = () => {
    this.charCreationInformation.attributePoints = this.attributes.order.reduce((sum, attribute) => sum - this[attribute].value, 10)
  }

  fieldsets: string[] = fieldsets

  id: string = shortid.generate()
  label: string = 'A'
  availableLevels: string[] = ['A', 'F', 'V', 'H']

  addables: Fieldset = addables
  // Idea, make a class for each that handles the updates automatically and have another logical group for the renderer. Then only edges.push()
  edges: Qualities<Edge> = new Qualities<Edge>(this.calculateData)
  hinderances: Qualities<Hinderance> = new Qualities<Hinderance>(this.calculateData)

  // General information
  generalInformation = generalInformation
  name: string = ''
  family: string = ''
  placeOfBirth: string = ''
  birthday: string = ''
  age: string = ''
  sex: string = ''
  species: string = ''
  size: string = ''
  weight: string = ''
  hairColor: string = ''
  eyeColor: string = ''
  culture: string = ''
  profession: string = ''
  title: string = ''
  socialStatus: string = ''
  characterisitics: string = ''
  otherInformation: string = ''

  // Delivered data
  deliveredData: Fieldset = deliveredData
  private baseCharisma = 0
  private basePace = 0
  parry: number = 0
  charisma: number = 0
  toughness: number = 0
  pace: number = 0

  // Attributes
  attributes: Fieldset = attributes
  agility: Attribute = new Attribute('Geschicklichkeit', this.calculateData)
  smarts: Attribute = new Attribute('Verstand', this.calculateData)
  spirit: Attribute = new Attribute('Willenskraft', this.calculateData)
  vigor: Attribute = new Attribute('Konstitution', this.calculateData)
  strength: Attribute = new Attribute('Stärke', this.calculateData)

  // Skills
  skills: Fieldset = skills
  // Combat skills
  fighting: Skill = new Skill('Kämpfen', 'agility', this.calculateData)
  schooting: Skill = new Skill('Schießen', 'agility', this.calculateData)
  throwing: Skill = new Skill('Werfen', 'agility', this.calculateData)

  // Body skills
  fastHands: Skill = new Skill('Fingerfertigkeit', 'agility', this.calculateData)
  stealth: Skill = new Skill('Heimlichkeit', 'agility', this.calculateData)
  climbing: Skill = new Skill('Klettern', 'strength', this.calculateData, true)
  bodyControl: Skill = new Skill('Körperbeherschung', 'agility', this.calculateData)
  crafting: Skill = new Skill('Handwerk', 'agility', this.calculateData, true)   // TODO mehrere Handwerke möglich
  riding: Skill = new Skill('Reiten', 'agility', this.calculateData, true)
  driving: Skill = new Skill('Fahrzeuge', 'agility', this.calculateData, true)
  lockpicking: Skill = new Skill('Schlösserknacken', 'agility', this.calculateData)
  swimming: Skill = new Skill('Schwimmen', 'strength', this.calculateData, true)
  perception: Skill = new Skill('Wahrnehmen', 'smarts', this.calculateData)

  // Social skills
  seduction: Skill = new Skill('Betören', 'smarts', this.calculateData, true)
  intimidation: Skill = new Skill('Einschüchtern', 'spirit', this.calculateData, true)
  etiquette: Skill = new Skill('Etikette', 'smarts', this.calculateData, true)
  empathy: Skill = new Skill('Menschenkenntnis', 'smarts', this.calculateData)
  persuade: Skill = new Skill('Überreden', 'smarts', this.calculateData)
  streetwise: Skill = new Skill('Umhören', 'smarts', this.calculateData)

  // Nature skills
  tracking: Skill = new Skill('Fährtensuche', 'smarts', this.calculateData)
  natureKnowledge: Skill = new Skill('Naturkunde', 'smarts', this.calculateData)
  surival: Skill = new Skill('Wildnisleben', 'spirit', this.calculateData)

  // Knowledge skills
  alchemy: Skill = new Skill('Alchemie', 'smarts', this.calculateData)
  gambling: Skill = new Skill('Glücksspiel', 'smarts', this.calculateData, true)
  faith: Skill = new Skill('Glaube', 'spirit', this.calculateData)  // TODO nur wenn arkaner Hintergrund(Wunder) gewählt wurde
  healing: Skill = new Skill('Heilkunde', 'smarts', this.calculateData)
  arcaneKnowledge: Skill = new Skill('Magiekunde', 'smarts', this.calculateData)
  language: Skill = new Skill('Sprache', 'smarts', this.calculateData, true)  // TODO mehrere Sprachen möglich
  knowledge: Skill = new Skill('Wissen', 'smarts', this.calculateData, true) // TODO mehrere Wissensfertigkeiten möglich
  spellcasting: Skill = new Skill('Zaubern', 'smarts', this.calculateData)  // Nur wenn arkaner Hintergrund(Magie) gewählt wurde


}

function calculateSkillPoints(skillValue: number, attributeValue: number, cost: number): number {
  if (skillValue <= attributeValue) {
    return skillValue * cost;
  } else {
    return (attributeValue * cost + (skillValue - attributeValue) * cost * 2);
  }
}

const fieldsets = [
  'generalInformation',
  'attributes',
  'deliveredData',
  'addables',
  'skills',
]

const generalInformation = {
  title: 'Allgemeine Informationen',
  order: [
    'name',
    'family',
    'placeOfBirth',
    'birthday',
    'age',
    'sex',
    'species',
    'size',
    'weight',
    'hairColor',
    'eyeColor',
    'culture',
    'profession',
    'title',
    'socialStatus',
    'characterisitics',
    'otherInformation',
  ]
}

const skills = {
  title: 'Fähigkeiten',
  order: [
    'fighting',
    'schooting',
    'throwing',
    'fastHands',
    'stealth',
    'climbing',
    'bodyControl',
    'crafting',
    'riding',
    'driving',
    'lockpicking',
    'swimming',
    'perception',
    'seduction',
    'intimidation',
    'etiquette',
    'empathy',
    'persuade',
    'streetwise',
    'tracking',
    'natureKnowledge',
    'surival',
    'alchemy',
    'gambling',
    'faith',
    'healing',
    'arcaneKnowledge',
    'language',
    'knowledge',
    'spellcasting',
  ]
}

const attributes = {
  title: 'Attribute',
  order: [
    'agility',
    'smarts',
    'spirit',
    'vigor',
    'strength'
  ]
}

const deliveredData = {
  title: 'Abgeleitete Werte',
  order: [
    'parry',
    'charisma',
    'toughness',
    'pace'
  ]
}

const addables = {
  title: 'Talente und Handicaps',
  order: [
    'edges',
    'hinderances'
  ]
}





