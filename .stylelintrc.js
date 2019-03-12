// FUI/SUI specific LESS variable
const SUI_SPECIFIC_AT_MARK_VARS = ['type', 'element'];

module.exports = {
  'extends': 'stylelint-config-standard',
  'rules': {
    // -----------------------------------------------------------------------------------------------------------------
    // Overrides 'standard' rules to suit the present format
    // -----------------------------------------------------------------------------------------------------------------
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

    // -----------------------------------------------------------------------------------------------------------------
    // Consider enabling (remove each line and follow `standard` rule)
    // -----------------------------------------------------------------------------------------------------------------
    'declaration-colon-space-before': null,
    'declaration-block-no-duplicate-properties': null,
    'declaration-empty-line-before': null,
    'max-empty-lines': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    // TODO: Enable with postcss-less https://github.com/stylelint/stylelint/issues/2748
    'selector-max-empty-lines': null,
    // TODO: Enable with postcss-less https://github.com/stylelint/stylelint/issues/2748
    'selector-descendant-combinator-no-non-space': null,
  }
};
