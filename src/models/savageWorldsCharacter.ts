import { NumberProperty, TextProperty, CharProperty, CharData, Property } from './interfaces';
import * as shortid from 'shortid';
import {
  CharCreationInformation,
  Modifier,
  ObjWithId,
  FieldGroup,
  Edge,
  Hinderance,
  Requirement,
  DeliveredData,
  FieldTypes,
} from './interfaces';
import { Skill } from './Skill';
import { Attribute } from './Attribute';
import { Qualities } from './Qualities';

export default class SavageWorldsCharacter {
  // Index signature for dynamic property access
  [key: string]: Property | any;
  [key: number]: undefined;

  constructor(charProperties?: CharData) {
    if (charProperties) {
      this.loadJson(charProperties);
    }

    this.init();
  }

  // initial calculation
  init = () => {
    this.calcAvailableSkillPoints();
    this.calcAvailableAttributePoints();
    this.calcDeliveredData();
  };

  loadJson = (charProperties: CharData) => {
    console.log('load json', charProperties);

    // TODO edges / hinderances not loaded properly
    this.id = charProperties._id;
    charProperties.data.forEach(charProperty => {
      if (this[charProperty.id]) {
        this[charProperty.id].value = charProperty.value;
      } else {
        console.error(`Property ${charProperty.id} not found.`);
      }
    });
    console.log('Name is ' + this.name);
  };

  getJson(): CharData {
    // TODO edges / hinderances not saved properly
    // All char properties that should be saved (not delivered data)
    const charPropsFlat = this.fieldsets.reduce((sum: string[], current) => {
      if (current.id === 'deliveredData') {
        return sum;
      }
      return sum.concat(current.order);
    }, []);
    // Saveable char property object (JsonProperty)
    const charPropsForDb: CharProperty[] = charPropsFlat.map(propertyId => {
      const propertyValue: number | string = this[propertyId].value;
      return {
        id: propertyId,
        value: propertyValue,
      };
    });
    // Remove Empty elements
    const charPropsForDbNotEmpty = charPropsForDb.filter(charProp => {
      if (charProp.value === '' || charProp.value === 0) {
        return false;
      }
      return true;
    });
    return {
      _id: this.id,
      data: charPropsForDbNotEmpty,
    };
  }
  /**
   * This function calculates the remaining skill and attribute points and applies modifiers when parameter set to true.
   * @param modifiersChanged Lets the function know if the modifiers should be re calculated
   */

  skillSideEffects = (effectsSkillPoints: boolean = false) => {
    this.calcDeliveredData();
    if (effectsSkillPoints) this.calcAvailableSkillPoints();
  };

  attributeSideEffects = (effectsAttributePoints: boolean = false) => {
    this.calcDeliveredData();
    if (effectsAttributePoints) this.calcAvailableAttributePoints();
  };

  qualitiesSideEffects = () => {
    this.calculateQualityPoints();
    this.calcDeliveredData();
  };

  calcDeliveredData = () => {
    const modifiers = this.getAllModifiers();

    const parryModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'parry' ? sum + modifier.value : sum),
      0
    );
    const toughnessModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'toughness' ? sum + modifier.value : sum),
      0
    );
    const paceModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'pace' ? sum + modifier.value : sum),
      0
    );
    const charismaModifer = modifiers.reduce(
      (sum, modifier) => (modifier.changesProperty === 'charisma' ? sum + modifier.value : sum),
      0
    );

    this.parry.value = (this.fighting.value * 2 + 2) / 2 + 2 + parryModifer;
    this.toughness.value = (this.vigor.value * 2 + 2) / 2 + 2 + toughnessModifer;
    this.pace.value = this.basePace + paceModifer;
    this.charisma.value = this.baseCharisma + charismaModifer;
  };

  // TODO Remove modifier again while calculating skillpoints?
  calcAvailableSkillPoints = () => {
    this.skillPoints.value = this.skills.order.reduce((sum, skillName) => {
      const skill: Skill = this[skillName];
      const attribute = this[skill.attribute];
      if (skill.calculationType === 'cheapSkill') {
        return sum - calculateSkillPoints(skill.value, attribute.value, 1);
      } else {
        return sum - calculateSkillPoints(skill.value, attribute.value, 2);
      }
    }, 50);
  };

  calcAvailableAttributePoints = () => {
    this.attributePoints.value = this.attributes.order.reduce(
      (sum, attribute) => sum - this[attribute].value,
      10
    );
  };

  calculateQualityPoints = () => {
    // TODO implement this
  };

  private appliedModifiers: Modifier[] = [];

  getAllModifiers = (): Modifier[] => {
    const edgeModifiers = this.edges.getModifiers();
    const hinderanceModifiers = this.hinderances.getModifiers();
    return edgeModifiers.concat(hinderanceModifiers);
  };

  /**
   * @param requirements An array of all requirements that have to be met
   * @returns Either an array of all requirements that were not met that is empy if all were met
   */
  checkRequirements = (requirements: Requirement[]): Requirement[] => {
    let requirementsFulfilled = true;
    const unmetRequirements = requirements.filter(requirement => {
      if (requirement.value > this[requirement.propertyId].value) {
        requirementsFulfilled = false;
        return true;
      }
      return false;
    });

    return requirementsFulfilled ? [] : unmetRequirements;
  };

  values = ['W4 - 2', 'W4', 'W6', 'W8', 'W10', 'W12'];

  charCreationInformation: FieldGroup = {
    id: 'charCreationInformation',
    title: 'Verfügbare Punkte',
    type: 'number',
    order: ['skillPoints', 'attributePoints'],
  };

  skillPoints: NumberProperty = { id: 'skillPoints', label: 'Fähigkeitspunkte', value: 50 };
  attributePoints: NumberProperty = { id: 'attributePoints', label: 'Attributspunkte', value: 10 };

  fieldsets: FieldGroup[] = [
    generalInformationFieldset,
    attributesFieldset,
    deliveredDataFieldset,
    qualitiesFieldset,
    skillsFieldset,
  ];

  id: string = shortid.generate();
  label: string = 'A';
  availableLevels: string[] = ['A', 'F', 'V', 'H'];

  qualities: FieldGroup = qualitiesFieldset;
  // Idea, make a class for each that handles the updates automatically and have another logical group for the renderer. Then only edges.push()
  edges: Qualities<Edge> = new Qualities<Edge>('edges', 'Talente', this.qualitiesSideEffects);
  hinderances: Qualities<Hinderance> = new Qualities<Hinderance>(
    'hinderances',
    'Handicaps',
    this.qualitiesSideEffects
  );

  // General information
  generalInformation = generalInformationFieldset;
  name: TextProperty = { id: 'name', label: 'Name', value: '' };
  family: TextProperty = { id: 'family', label: 'Familie', value: '' };
  placeOfBirth: TextProperty = { id: 'placeOfBirth', label: 'Geburtsort', value: '' };
  birthday: TextProperty = { id: 'birthday', label: 'Geburtstag', value: '' };
  age: TextProperty = { id: 'age', label: 'Alter', value: '' };
  sex: TextProperty = { id: 'sex', label: 'Geschlecht', value: '' };
  species: TextProperty = { id: 'species', label: 'Spezie', value: '' };
  size: TextProperty = { id: 'size', label: 'Größe', value: '' };
  weight: TextProperty = { id: 'weight', label: 'Gewicht', value: '' };
  hairColor: TextProperty = { id: 'hairColor', label: 'Haarfarbe', value: '' };
  eyeColor: TextProperty = { id: 'eyeColor', label: 'Augenfarbe', value: '' };
  culture: TextProperty = { id: 'culture', label: 'Kultur', value: '' };
  profession: TextProperty = { id: 'profession', label: 'Profession', value: '' };
  title: TextProperty = { id: 'title', label: 'Title', value: '' };
  socialStatus: TextProperty = { id: 'socialStatus', label: 'Sozialstatus', value: '' };
  characterisitics: TextProperty = { id: 'characterisitics', label: 'Charakteristiken', value: '' };
  otherInformation: TextProperty = {
    id: 'otherInformation',
    label: 'Ander Informationen',
    value: '',
  };

  // Delivered data
  deliveredData: FieldGroup = deliveredDataFieldset;
  private baseCharisma = 0;
  private basePace = 0;
  parry: DeliveredData = { id: 'parry', label: 'Parade', value: 0 };
  charisma: DeliveredData = { id: 'charisma', label: 'Charisma', value: 0 };
  toughness: DeliveredData = { id: 'toughness', label: 'Robustheit', value: 0 };
  pace: DeliveredData = { id: 'pace', label: 'Geschwindigkeit', value: 0 };

  // Attributes
  attributes: FieldGroup = attributesFieldset;
  agility: Attribute = new Attribute('agility', 'Geschicklichkeit', this.attributeSideEffects);
  smarts: Attribute = new Attribute('smarts', 'Verstand', this.attributeSideEffects);
  spirit: Attribute = new Attribute('spirit', 'Willenskraft', this.attributeSideEffects);
  vigor: Attribute = new Attribute('vigor', 'Konstitution', this.attributeSideEffects);
  strength: Attribute = new Attribute('strength', 'Stärke', this.attributeSideEffects);

  // Skills
  skills: FieldGroup = skillsFieldset;
  // Combat skills
  fighting: Skill = new Skill('fighting', 'Kämpfen', 'agility', this.skillSideEffects);
  schooting: Skill = new Skill('schooting', 'Schießen', 'agility', this.skillSideEffects);
  throwing: Skill = new Skill('throwing', 'Werfen', 'agility', this.skillSideEffects);

  // Body skills
  fastHands: Skill = new Skill('fastHands', 'Fingerfertigkeit', 'agility', this.skillSideEffects);
  stealth: Skill = new Skill('stealth', 'Heimlichkeit', 'agility', this.skillSideEffects);
  climbing: Skill = new Skill('climbing', 'Klettern', 'strength', this.skillSideEffects, true);
  bodyControl: Skill = new Skill(
    'bodyControl',
    'Körperbeherschung',
    'agility',
    this.skillSideEffects
  );
  crafting: Skill = new Skill('crafting', 'Handwerk', 'agility', this.skillSideEffects, true); // TODO mehrere Handwerke möglich
  riding: Skill = new Skill('riding', 'Reiten', 'agility', this.skillSideEffects, true);
  driving: Skill = new Skill('driving', 'Fahrzeuge', 'agility', this.skillSideEffects, true);
  lockpicking: Skill = new Skill(
    'lockpicking',
    'Schlösserknacken',
    'agility',
    this.skillSideEffects
  );
  swimming: Skill = new Skill('swimming', 'Schwimmen', 'strength', this.skillSideEffects, true);
  perception: Skill = new Skill('perception', 'Wahrnehmen', 'smarts', this.skillSideEffects);

  // Social skills
  seduction: Skill = new Skill('seduction', 'Betören', 'smarts', this.skillSideEffects, true);
  intimidation: Skill = new Skill(
    'intimidation',
    'Einschüchtern',
    'spirit',
    this.skillSideEffects,
    true
  );
  etiquette: Skill = new Skill('etiquette', 'Etikette', 'smarts', this.skillSideEffects, true);
  empathy: Skill = new Skill('empathy', 'Menschenkenntnis', 'smarts', this.skillSideEffects);
  persuade: Skill = new Skill('persuade', 'Überreden', 'smarts', this.skillSideEffects);
  streetwise: Skill = new Skill('streetwise', 'Umhören', 'smarts', this.skillSideEffects);

  // Nature skills
  tracking: Skill = new Skill('tracking', 'Fährtensuche', 'smarts', this.skillSideEffects);
  natureKnowledge: Skill = new Skill(
    'natureKnowledge',
    'Naturkunde',
    'smarts',
    this.skillSideEffects
  );
  surival: Skill = new Skill('surival', 'Wildnisleben', 'spirit', this.skillSideEffects);

  // Knowledge skills
  alchemy: Skill = new Skill('alchemy', 'Alchemie', 'smarts', this.skillSideEffects);
  gambling: Skill = new Skill('gambling', 'Glücksspiel', 'smarts', this.skillSideEffects, true);
  faith: Skill = new Skill('faith', 'Glaube', 'spirit', this.skillSideEffects); // TODO nur wenn arkaner Hintergrund(Wunder) gewählt wurde
  healing: Skill = new Skill('healing', 'Heilkunde', 'smarts', this.skillSideEffects);
  arcaneKnowledge: Skill = new Skill(
    'arcaneKnowledge',
    'Magiekunde',
    'smarts',
    this.skillSideEffects
  );
  language: Skill = new Skill('language', 'Sprache', 'smarts', this.skillSideEffects, true); // TODO mehrere Sprachen möglich
  knowledge: Skill = new Skill('knowledge', 'Wissen', 'smarts', this.skillSideEffects, true); // TODO mehrere Wissensfertigkeiten möglich
  spellcasting: Skill = new Skill('spellcasting', 'Zaubern', 'smarts', this.skillSideEffects); // Nur wenn arkaner Hintergrund(Magie) gewählt wurde

  // TODO remove the ! here
  equipment!: {
    weapons: [];
    armor: [];
    gear: [];
    money: number;
  };
}

function calculateSkillPoints(skillValue: number, attributeValue: number, cost: number): number {
  if (skillValue <= attributeValue) {
    return skillValue * cost;
  } else {
    return attributeValue * cost + (skillValue - attributeValue) * cost * 2;
  }
}

const generalInformationFieldset: FieldGroup = {
  id: 'generalInformation',
  title: 'Allgemeine Informationen',
  type: 'text',
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
  ],
};

const skillsFieldset: FieldGroup = {
  id: 'skills',
  title: 'Fähigkeiten',
  type: 'number',
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
  ],
};

const attributesFieldset: FieldGroup = {
  id: 'attributes',
  title: 'Attribute',
  type: 'number',
  order: ['agility', 'smarts', 'spirit', 'vigor', 'strength'],
};

const deliveredDataFieldset: FieldGroup = {
  id: 'deliveredData',
  title: 'Abgeleitete Werte',
  type: 'readonly',
  order: ['parry', 'charisma', 'toughness', 'pace'],
};

const qualitiesFieldset: FieldGroup = {
  id: 'qualities',
  title: 'Talente und Handicaps',
  type: 'addable',
  order: ['edges', 'hinderances'],
};
