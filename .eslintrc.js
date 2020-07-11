module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: ['ember', 'prettier', 'qunit', 'import-helpers'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:qunit/recommended', 'prettier'],
  env: {
    browser: true
  },
  rules: {
    'ember/no-jquery': 'error',
    'prettier/prettier': 'error',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          // Testing modules
          ['/^qunit/', '/^ember-qunit/', '/^@ember/test-helpers/', '/^ember-exam/'],
          // Ember.js modules
          ['/^ember$/', '/^@ember/', '/^ember-data/'],
          'module',
          [`/^${require('./package.json').name}\\//`],
          ['parent', 'sibling', 'index']
        ],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ]
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        '.prettierrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: ['addon/**', 'addon-test-support/**', 'app/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    }
  ]
};
