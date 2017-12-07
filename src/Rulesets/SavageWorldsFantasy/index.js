

export default class CharSheet {

  constructor() {
    
    
    this.id = 'savageWorldsFantasy'
    this.title = 'Savage Worlds Fantasy'
    this.meta = {
      calculationTypes: {
        attribute: {
          type: 'static',
          costsPerPoint: 1
        },
        edge: {
          type: 'static',
          costsPerPoint: 2
        },
        hinderance: {
          type: 'static',
          costsPerPoint: -2
        },
        smallHinderance: {
          type: 'static',
          costsPerPoint: -1
        },
        skill: {
          type: 'dynamic',
          conditions: [
            {
              'if': 'skill <= attribute',
              costsPerPoint: 2
            },
            {
              'if': 'skill > attribute',
              costsPerPoint: 4
            }
          ]
        },
        cheapSkill: {
          type: 'dynamic',
          conditions: [
            {
              'if': 'skill <= attribute',
              costsPerPoint: 1
            },
            {
              'if': 'skill > attribute',
              costsPerPoint: 2
            }
          ]
        }
      },
      availableValues: [
        ' ',
        'W4',
        'W6',
        'W8',
        'W10',
        'W12'
      ],
      charCreationInformation: {
        skillPoints: {
          label: 'Fertigkeitspunkte',
          value: 0,
        },
        attributePoints: {
          label: 'Attribute',
          value: 0,
        }
      }
    }
    this.fieldsets = [
      {
        id: 'generalInformation',
        title: 'Allgemein',
        fields: [
          {
            id: 'name',
            label: 'Name'
          },
          {
            id: 'family',
            label: 'Familie'
          },
          {
            id: 'placeOfBirth',
            label: 'Geburtsort'
          },
          {
            id: 'birthday',
            label: 'Geburtsdatum'
          },
          {
            id: 'age',
            label: 'Alter'
          },
          {
            id: 'sex',
            label: 'Geschlecht'
          },
          {
            id: 'species',
            label: 'Spezies'
          },
          {
            id: 'size',
            label: 'Größe'
          },
          {
            id: 'weight',
            label: 'Gewicht'
          },
          {
            id: 'hairColor',
            label: 'Haarfarbe'
          },
          {
            id: 'eyecolor',
            label: 'Augenfarbe'
          },
          {
            id: 'culture',
            label: 'Kultur'
          },
          {
            id: 'profession',
            label: 'Profession'
          },
          {
            id: 'title',
            label: 'Titel'
          },
          {
            id: 'socialStatus',
            label: 'Sozialstatus'
          },
          {
            id: 'characteristics',
            label: 'Charakteristika'
          },
          {
            id: 'otherInformation',
            label: 'Sonstiges'
          }
        ]
      },
      {
        id: 'attributes',
        title: 'Attribute',
        fields: [
          {
            id: 'smarts',
            label: 'Intelligenz',
            type: 'number',
            value: 1,
            calculationType: 'attribute'
          },
          {
            id: 'agility',
            label: 'Geschicklichkeit',
            type: 'number',
            value: 1,
            calculationType: 'attribute'
          },
          {
            id: 'spirit',
            label: 'Willenskraft',
            type: 'number',
            value: 1,
            calculationType: 'attribute'
          },
          {
            id: 'constitution',
            label: 'Konstitution',
            type: 'number',
            value: 1,
            calculationType: 'attribute'
          },
          {
            id: 'strength',
            label: 'Stärke',
            type: 'number',
            value: 1,
            calculationType: 'attribute'
          }
        ]
      },
      {
        id: 'deliveredData',
        title: 'Grundwerte',
        fields: [
          {
            id: 'parry',
            label: 'Parade',
            type: 'calculated',
            value: 0
          },
          {
            id: 'charisma',
            label: 'Charisma',
            type: 'calculated',
            value: 0
          },
          {
            id: 'toughness',
            label: 'Robustheit',
            type: 'calculated',
            value: 0
          },
          {
            id: 'pace',
            label: 'Geschwindigkeit',
            type: 'calculated',
            value: 12
          }
        ]
      },
      {
        id: 'edges',
        title: 'Talente',
        fields: [
          {
            id: 'edges',
            label: 'Talente',
            singularLabel: 'Talent',
            type: 'addable',
            calculationType: 'edge',
            selectableGroups: [
              {
                id: 'backgroundEdges',
                label: 'Hintergrund Talente',
                selectables: [
                  {
                    id: 'acclimatized',
                    label: 'Akklimatisiert',
                    requirementes: {
                      level: 'A'
                    },
                    information: '+4 auf Ko. Würfe gegen Erschöpfung bei Hitze oder Kälte'
                  },
                  {
                    id: 'noble',
                    label: 'Adelig',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Charisma +1 (in Schichten), Reich, Verpflichtungen'
                  },
                  {
                    id: 'arcaneResistance',
                    label: 'Arkane Resistenz',
                    requirementes: {
                      level: 'A'
                    },
                    information: '+2 RS /+2 auf Magiewiderstand gegen Mächte'
                  },
                  {
                    id: 'improvedArcaneResistance',
                    label: 'Stärkere Arkane Resistenz',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Wie oben nur +4'
                  },
                  {
                    id: 'arcaneBackground',
                    label: 'Arkaner Hintergrund',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Siehe Regelbuch'
                  },
                  {
                    id: 'attractive',
                    label: 'Attraktiv',
                    requirementes: {
                      level: 'A'
                    },
                    information: '+1 Charisma',
                    modifiers: {
                      charisma: 1
                    }
                  },
                  {
                    id: 'veryAttractive',
                    label: 'Sehr Attraktiv',
                    requirementes: {
                      level: 'A'
                    },
                    information: '+2 Charisma',
                    modifiers: {
                      charisma: 1
                    }
                  },
                  {
                    id: 'alertness',
                    label: 'Aufmerksamkeit',
                    requirementes: {
                      level: 'A'
                    },
                    information: '+2 auf Wahrnehmung'
                  },
                  {
                    id: 'ambidextrous',
                    label: 'Beidhändig',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Kein-2 Abzug für das verwenden der falschen Hand'
                  },
                  {
                    id: 'berserk',
                    label: 'Berserker',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Verstandprobe gegen Raserei nach Verletzung (Wunde). Raserei: +2 Kämpfen und Stärke, Parade-2, Robustheit +2, Wenn ein Würfel trifft aber der andere, eine1 zeigt wird ein zufä,lliges Ziel getroffen. Zum Beenden eine Aktion und eine Verstandsprobe mit-2'
                  },
                  {
                    id: 'ironAffinity',
                    label: 'Eisenaffine Aura',
                    requirementes: {
                      level: 'A',
                      edges: [
                        'arcaneBackground'
                      ]
                    },
                    information: 'Der Malus durch Bann des Eisens sinkt auf-2'
                  },
                  {
                    id: 'fleetFooted',
                    label: 'Flink',
                    requirementes: {
                      level: 'A',
                      agility: 2
                    },
                    information: '+2 Bewegungsreichweite',
                    modifiers: {
                      pace: 2
                    }
                  },
                  {
                    id: 'luck',
                    label: 'Glück',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Ein Bennie mehr'
                  },
                  {
                    id: 'greatLuck',
                    label: 'Großes Glück',
                    requirementes: {
                      level: 'A',
                      edges: [
                        'luck'
                      ]
                    },
                    information: 'Zwei Bennies mehr'
                  },
                  {
                    id: 'healer',
                    label: 'Heiler',
                    requirementes: {
                      level: 'A',
                      constitution: 3
                    },
                    information: '+2 auf Heilenproben'
                  },
                  {
                    id: 'brawny',
                    label: 'Kräftig',
                    requirementes: {
                      level: 'A',
                      constitution: 2,
                      strength: 2
                    },
                    information: '+1 Robustheit, erhöhte Tragkraft (x7 statt x5)',
                    modifiers: {
                      toughness: 1
                    }
                  },
                  {
                    id: 'brave',
                    label: 'Mutig',
                    requirementes: {
                      level: 'A',
                      spirit: 2
                    },
                    information: '+2 auf Furch widerstehen'
                  },
                  {
                    id: 'rich',
                    label: 'Reich',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Dreifaches Startkapital, Jahreseinkommen gleich dem10fachen des dreifachen Startkapitals'
                  },
                  {
                    id: 'filthyRich',
                    label: 'Stinkreich',
                    requirementes: {
                      level: 'A',
                      edges: [
                        'rich'
                      ]
                    },
                    information: 'Fünffaches Startkapital, Jahreseinkommen gleich dem10fachen des fünffachen Startkapitals'
                  },
                  {
                    id: 'sixthSense',
                    label: 'Sechster Sinn',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Der Charakter kann mit Wahrnehmung-2 einen Hinterhalt oder eine andere Gefahr '
                  },
                  {
                    id: 'schelm',
                    label: 'Schelm',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Ein Charakter mit diesem Hintergrund- Talent wurde als Säugling von Kobolden entführt und aufgezogen. Seine Zieheltern haben ihm allerlei magische Späße und die koboldische Lebensart beigebracht. Er kann per Zauberei Menschen nackt dastehen lassen, Kobolde rufen, Illusionen hervorrufen oder ähnliche Dinge tun, um einen Spaß zu machen. Er braucht dazu weder einen Arkanen Hintergrund noch Machtpunkte. Schelme setzen diese Fähigkeit aber nur ein, um sich selbst oder andere zu erheitern, niemals, um andere zu schädigen. Sie können aber trotzdem für Tricks uns geistige Duelle eingesetzt werden.'
                  },
                  {
                    id: 'quick',
                    label: 'Schnell',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Im Kampf werden Aktionskarten von5 oder niedriger neu gezogen.'
                  },
                  {
                    id: 'fastHealer',
                    label: 'Schnelle Heilung',
                    requirementes: {
                      level: 'A'
                    },
                    information: '+2 auf Genesungsproben'
                  },
                  {
                    id: 'animalEmpathy',
                    label: 'Tierempathie',
                    requirementes: {
                      level: 'A'
                    },
                    information: 'Der Charakter kann seine Bennies mit Tiergefährten teilen'
                  }
                ]
              },
              {
                id: 'socialEdges',
                label: 'Soziale Talente',
                selectables: [
                  {
                    id: 'thisisatest',
                    label: 'Dies ist ein Test',
                    requirementes: {
                      level: 'A'
                    },
                    information: '+4 auf Ko. Würfe gegen Erschöpfung bei Hitze oder Kälte'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'hinderances',
        title: 'Handicaps',
        fields: [
          {
            id: 'hinderances',
            label: 'Handicaps',
            singularLabel: 'Handicap',
            type: 'addable',
            calculationType: 'hinderance',
            selectableGroups: [
              {
                id: 'hinderances',
                label: 'Handicaps',
                selectables: [
                  {
                    id: 'thisisatest',
                    label: 'Dies ist ein Test',
                    requirementes: {},
                    information: '+4 auf Ko. Würfe gegen Erschöpfung bei Hitze oder Kälte'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'skills',
        title: 'Fertigkeiten',
        fields: [
          {
            id: 'alchemy',
            label: 'Alchemie',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'seduction',
            label: 'Betören',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'gambling',
            label: 'Glückspiele',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'healing',
            label: 'Heilkunde',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'tracking',
            label: 'Fährtensuche',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'arcaneKnowledge',
            label: 'Magiekunde',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'empathy',
            label: 'Menschenkenntnis',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'natureKnowledge',
            label: 'Naturkunde',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'language',
            label: 'Sprache',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'persuade',
            label: 'Überreden',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'streetwise',
            label: 'Umhören',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'disguise',
            label: 'Verkleiden',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'perception',
            label: 'Wahrnehmung',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'spellcasting',
            label: 'Zaubern',
            type: 'number',
            attribute: 'smarts',
            calculationType: 'skill',
            value: 0,
            rule: 'arcaneBackground'
          },
          {
            id: 'driving',
            label: 'Fahrzeuge',
            type: 'number',
            attribute: 'agility',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'fastHands',
            label: 'Fingerfertigkeit',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'stealth',
            label: 'Heimlichkeit',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'fighting',
            label: 'Kämpfen',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'closeCombat',
            label: 'Nahkampf',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
            rule: '<= fighting'
          },
          {
            id: 'swords',
            label: 'Klingenwaffen',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
            rule: '<= fighting'
          },
          {
            id: 'longWepaons',
            label: 'Stangenwaffen',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
            rule: '<= fighting'
          },
          {
            id: 'bodyControl',
            label: 'Körperbeherrschung',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'riding',
            label: 'Reiten',
            type: 'number',
            attribute: 'agility',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'schooting',
            label: 'Schießen',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'crossbows',
            label: 'Armbrüste',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
            rule: '<= shooting'
          },
          {
            id: 'bows',
            label: 'Bögen',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
            rule: '<= shooting'
          },
          {
            id: 'lockpicking',
            label: 'Schlösser knacken',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'throwing',
            label: 'Werfen',
            type: 'number',
            attribute: 'agility',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'intimidation',
            label: 'Einschüchtern',
            type: 'number',
            attribute: 'spirit',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'faith',
            label: 'Glaube',
            type: 'number',
            attribute: 'spirit',
            calculationType: 'skill',
            value: 0,
            rule: 'arcaneBackground'
          },
          {
            id: 'surival',
            label: 'Wildnisleben',
            type: 'number',
            attribute: 'spirit',
            calculationType: 'skill',
            value: 0,
          },
          {
            id: 'impactWeapons',
            label: 'Hiebwaffen',
            type: 'number',
            attribute: 'strength',
            calculationType: 'skill',
            value: 0,
            rule: '<= fighting'
          },
          {
            id: 'climbing',
            label: 'Klettern',
            type: 'number',
            attribute: 'strength',
            calculationType: 'cheapSkill',
            value: 0,
          },
          {
            id: 'swimming',
            label: 'Schwimmen',
            type: 'number',
            attribute: 'strength',
            calculationType: 'cheapSkill',
            value: 0,
          }
        ]
      },
      {
        id: 'weapons',
        title: 'Waffen',
        fields: [
          {
            id: '',
            label: 'test'
          }
        ]
      },
      {
        id: 'armor',
        title: 'Rüstungen',
        fields: [
          {
            id: '',
            label: 'test'
          }
        ]
      },
      {
        id: 'equipment',
        title: 'Ausrüstung',
        fields: [
          {
            id: '',
            label: 'test'
          }
        ]
      }
    ]
  }

  calculatePoints() {
    this.calcParry()
    this.calcToughness()
  }

  calcParry() {
    const fightingValue = this.fieldsets.find(skills).fields.find(fighting).value;
    this.fieldsets.find(deliveredData).fields.find(parry).value = (fightingValue * 2 + 2) / 2 + 2;
  }

  calcToughness() {
    const constitutionValue = this.fieldsets.find(attributes).fields.find(constitution).value;
    this.fieldsets.find(deliveredData).fields.find(toughness).value = (constitutionValue * 2 + 2) / 2 + 2;
  }

  calcCharisma() {
  }

  calcPace() {
  }

  calcAvailableSkillPoints() {
    this.meta.charCreationInformation.attributePoints = this.fieldsets.find(skills).fields
      .reduce((sum, skill) => {
        const attribute = this.fieldsets.find(attributes).fields.find(field => field.id === skill.attribute);
        if (skill.calculationType === 'cheapSkill') {
          return sum - calculateSkillPoints(skill.value, attribute.value, 1)
        } else {
          return sum - calculateSkillPoints(skill.value, attribute.value, 2) 
        }
      }, 50)
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

