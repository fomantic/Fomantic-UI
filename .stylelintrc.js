// FUI/SUI specific LESS variable
const SUI_SPECIFIC_AT_MARK_VARS = ['type', 'element'];

module.exports = {
  // 'extends': 'stylelint-config-standard',
  'rules': {
    'at-rule-empty-line-before': ['always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested',
      ],
      ignore: ['after-comment'],
      ignoreAtRules: SUI_SPECIFIC_AT_MARK_VARS
    }],
    'at-rule-no-unknown': [true, {
      ignoreAtRules: SUI_SPECIFIC_AT_MARK_VARS
    }],
    'indentation': [2, {
      'indentInsideParens': 'twice',
      'except': ['param']
    }],
    'rule-empty-line-before': ['never', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'selector-pseudo-element-colon-notation': 'single',
    // disable
    'declaration-colon-space-before': null,
    'declaration-block-no-duplicate-properties': null,
    'declaration-empty-line-before': null,
    'max-empty-lines': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
  }
};
