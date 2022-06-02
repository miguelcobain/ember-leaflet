'use strict';

module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 120,
  overrides: [
    {
      files: '*.hbs',
      options: {
        singleQuote: false
      }
    }
  ]
};
