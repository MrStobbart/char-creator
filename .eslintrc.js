module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'airbnb',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['warn', 2],
        'no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'func-names': 'off',
        'no-shadow': 'off',
        'max-len': ['warn', { code: 120 }],
        'no-irregular-whitespace': 'warn',
        'prefer-destructuring': 'off'
    },
};
