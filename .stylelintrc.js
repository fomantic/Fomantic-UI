module.exports = {
    extends: [
        'stylelint-config-standard',
    ],
    customSyntax: 'postcss-less',
    ignoreFiles: [
        'dist/**',
        'test/coverage/**',
    ],
    rules: {
        'at-rule-empty-line-before': null,
        'block-closing-brace-newline-before': null, // fix bad formatting with "each()"
        'declaration-block-trailing-semicolon': null, // fix bad formatting with "each()"
        indentation: null, // TODO change to "4" once https://github.com/fomantic/Fomantic-UI/pull/2593#discussion_r1045131096 is fixed
        'max-line-length': null,
        'no-descending-specificity': null,
        'no-extra-semicolons': null, // fix GH-1832 - workaround for wikimedia/less.php parser
        'rule-empty-line-before': null,

        // TODO rules to be removed/fixed in v2.10.0 as fixes are not compatible with IE11
        'alpha-value-notation': 'number', // https://caniuse.com/mdn-css_properties_opacity_percentages
        'color-function-notation': 'legacy', // https://caniuse.com/mdn-css_types_color_rgba_space_separated_parameters

        // TODO
        'string-quotes': null, // 1676 errors
        'at-rule-no-unknown': null, // 1081 errors
        'property-case': null, // 866 errors
        'at-rule-name-case': null, // 764 errors
        'no-duplicate-selectors': null, // 224 errors
        'selector-not-notation': null, // 169 errors
        'no-invalid-position-at-import-rule': null, // 104 errors
        'function-no-unknown': null, // 67 errors
        'length-zero-no-unit': null, // 64 errors
        'import-notation': null, // 56 errors
        'keyframes-name-pattern': null, // 50 errors
        'property-no-vendor-prefix': null, // 49 errors
        'block-no-empty': null, // 25 errors
        'selector-no-vendor-prefix': null, // 19 errors
        'selector-class-pattern': null, // 19 errors
        'number-no-trailing-zeros': null, // 16 errors
        'font-family-name-quotes': null, // 13 errors
        'declaration-block-no-redundant-longhand-properties': null, // 12 errors
        'value-keyword-case': null, // 12 errors
        'value-no-vendor-prefix': null, // 9 errors
        'no-empty-source': null, // 8 errors
        'font-family-no-missing-generic-family-keyword': null, // 8 errors
        'number-max-precision': null, // 7 errors
        'selector-attribute-quotes': null, // 7 errors
        'shorthand-property-no-redundant-values': null, // 5 errors
        'function-url-quotes': null, // 5 errors
        'declaration-block-no-duplicate-properties': null, // 2 errors
        'font-family-no-duplicate-names': null, // 2 errors
        'function-linear-gradient-no-nonstandard-direction': null, // 1 error
        'at-rule-no-vendor-prefix': null, // 1 error
        'declaration-block-no-shorthand-property-overrides': null, // 1 error
    },
    reportNeedlessDisables: true,
};
