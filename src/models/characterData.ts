import { FieldGroup } from './interfaces';

export function calculateSkillPoints(skillValue: number, attributeValue: number, cost: number): number {
  if (skillValue <= attributeValue) {
    return skillValue * cost;
  } else {
    return attributeValue * cost + (skillValue - attributeValue) * cost * 2;
  }
}

export const generalInformationFieldset: FieldGroup = {
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

export const skillsFieldset: FieldGroup = {
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

export const attributesFieldset: FieldGroup = {
  id: 'attributes',
  title: 'Attribute',
  type: 'number',
  order: ['agility', 'smarts', 'spirit', 'vigor', 'strength'],
};

export const deliveredDataFieldset: FieldGroup = {
  id: 'deliveredData',
  title: 'Abgeleitete Werte',
  type: 'readonly',
  order: ['parry', 'charisma', 'toughness', 'pace'],
};

export const qualitiesFieldset: FieldGroup = {
  id: 'qualities',
  title: 'Talente und Handicaps',
  type: 'addable',
  order: ['edges', 'hinderances'],
};
