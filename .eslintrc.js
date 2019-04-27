// This file is only used by the IDE and not by the compiler atm
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['react-app'],
  rules: {
    indent: ['warn', 2],
    'max-len': ['warn', { code: 120 }],
    'no-use-before-define': ['off', { functions: false, classes: false, variables: false }],
  },
};
