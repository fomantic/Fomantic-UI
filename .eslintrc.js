module.exports = {
  'env': {
    'browser': true,
    'jquery': true
  },
  'extends': 'standard',
  'parserOptions': {
    'ecmaVersion': 5
  },
  'rules': {
    // -----------------------------------------------------------------------------------------------------------------
    // Overrides 'standard' rules to suit the present format
    // -----------------------------------------------------------------------------------------------------------------
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    'indent': ['error', 2, { 'outerIIFEBody': 0 }],
    'key-spacing': ['error', { 'align': { 'beforeColon': true, 'afterColon': true, 'on': 'colon' } }],
    'no-labels': ['error', { 'allowLoop': true }],
    'no-multi-spaces': ['error', {
      'exceptions': {
        'Property': true,
        'VariableDeclarator': true,
        'AssignmentExpression': true
      }
    }],
    'operator-linebreak': ['error', 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
        '+': 'before',
        '||': 'before'
      }
    }],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', { 'anonymous': 'never', 'named': 'always', 'asyncArrow': 'always' }],
    'yoda': ['error', 'never', { 'exceptRange': true }],

    // -----------------------------------------------------------------------------------------------------------------
    // Consider enabling (remove each line and follow `standard` rule)
    // -----------------------------------------------------------------------------------------------------------------
    'eqeqeq': ['off'],
    'no-extra-boolean-cast': ['off'],
    'no-new-func': ['off'],
    'no-redeclare': ['off'],
    'no-self-assign': ['off'],
    'no-shadow-restricted-names': ['off'],
    'no-unneeded-ternary': ['off'],
    'no-unused-vars': ['off'],
    'no-useless-escape': ['off'],
    'no-useless-return': ['off'],
    'one-var': ['off'],
    'valid-typeof': ['off'],
  }
};
