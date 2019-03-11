module.exports = {
  // 'extends': 'stylelint-config-standard',
  'rules': {
    'rule-empty-line-before': ['never', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'selector-pseudo-element-colon-notation': 'single',
    // disable
    'max-empty-lines': null,
    'no-descending-specificity': null
  }
};
