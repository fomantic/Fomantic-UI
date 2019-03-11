module.exports = {
  // 'extends': 'stylelint-config-standard',
  'rules': {
    'rule-empty-line-before': ['never', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'selector-pseudo-element-colon-notation': 'single',
    // disable
    'no-descending-specificity': null
  }
};
