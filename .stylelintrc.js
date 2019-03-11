module.exports = {
  // 'extends': 'stylelint-config-standard',
  'rules': {
    'at-rule-empty-line-before': ['always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested',
      ],
      ignore: ['after-comment'],
      // FUI/SUI specific LESS variable
      ignoreAtRules: ['type', 'element']
    }],
    'rule-empty-line-before': ['never', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'selector-pseudo-element-colon-notation': 'single',
    // disable
    'declaration-empty-line-before': null,
    'max-empty-lines': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
  }
};
