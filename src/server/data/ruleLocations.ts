interface RuleLocation {
  fileUrl: string;
  data: { title: string; tableHeaders: string[] }[];
}

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
      },
      {
        title: 'hindrances',
        tableHeaders: ['#### Handicaps'],
      },
    ],
  },
};
