export interface RuleLocationData {
  title: string;
  tableHeaders: string[];
  propertyNames: { [tableHeaderLabel: string]: string };
}

export interface RuleLocation {
  fileUrl: string;
  data: RuleLocationData[];
}

export const getRuleLocation = (name: string) => {
  const ruleLocation = ruleLocations[name];
  if (!ruleLocation) throw new Error(`No rule set with the name ${name} found`);
  return ruleLocation;
};

export const ruleLocations: { [key: string]: RuleLocation } = {
  savageRun: {
    fileUrl: 'https://api.github.com/repos/MrStobbart/savage-worlds/contents/Savage%20Run/Savage-Run-Stobbart.md',
    data: [
      {
        title: 'edges',
        tableHeaders: [
          '#### Hintergrundtalente',
          '#### Anführertalente',
          '#### Allgemeine Talente',
          '#### Nahkampf Talente',
          '#### Fernkampf Talente',
          '#### Soziale Talente',
          '#### Magische Talente',
          '##### Arkane Talente der Initiation',
          '#### Hackertalente',
          '#### Expertentalente',
          '#### Riggertalente',
          '#### Legendäre Talente',
        ],
        propertyNames: {
          Talent: 'label',
          Anforderungen: 'requirements',
          Beschreibung: 'information',
          Wirkung: 'modifiers',
        },
      },
      {
        title: 'hindrances',
        tableHeaders: ['#### Handicaps'],
        propertyNames: {
          Name: 'label',
          Auswirkungen: 'information',
          Wirkung: 'modifiers',
        },
      },
    ],
  },
};
