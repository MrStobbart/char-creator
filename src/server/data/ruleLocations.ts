interface RuleLocation {
  fileUrl: string;
  edges: string[];
  hindrances: string[];
}

export const ruleLocations: { [key: string]: RuleLocation } = {
  savageRun: {
    fileUrl: 'https://api.github.com/repos/MrStobbart/savage-worlds/contents/Savage%20Run/Savage-Run-Stobbart.md',
    edges: ['####Hintergrundtalente'],
    hindrances: ['####Handicaps'],
  },
};
