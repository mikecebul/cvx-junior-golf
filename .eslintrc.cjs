module.exports = {
  extends: 'next',
  rules: {
    // Disable the problematic rule
    'react/display-name': 'off',
  },
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
