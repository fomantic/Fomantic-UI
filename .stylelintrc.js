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
        'at-rule-name-case': null,
        'at-rule-no-unknown': null,
        'block-closing-brace-newline-before': null, // fix bad formatting with "each()"
        'color-function-notation': 'legacy',
        'color-hex-case': 'lower',
        'declaration-block-trailing-semicolon': null, // fix bad formatting with "each()"
        'function-no-unknown': null,
        indentation: null, // TODO change to "4" once https://github.com/fomantic/Fomantic-UI/pull/2593#discussion_r1045131096 is fixed
        linebreaks: 'unix',
        'max-line-length': null,
        'no-descending-specificity': null,
        'no-extra-semicolons': null, // fix GH-1832 - workaround for wikimedia/less.php parser
        'no-duplicate-selectors': null,
        'number-max-precision': 5,
        'property-case': null,
        'rule-empty-line-before': null,
        'string-quotes': 'double',
        'value-keyword-case': null,

        // TODO rules to be removed/fixed in v2.10.0 as fixes are not compatible with IE11
        'alpha-value-notation': 'number', // https://caniuse.com/mdn-css_properties_opacity_percentages

        // TODO
        'selector-not-notation': null, // 169 errors
        'import-notation': null, // 56 errors
        'keyframes-name-pattern': null, // 50 errors
        'property-no-vendor-prefix': null, // 49 errors
        'block-no-empty': null, // 25 errors
        'selector-no-vendor-prefix': null, // 19 errors
        'selector-class-pattern': null, // 19 errors
        'declaration-block-no-redundant-longhand-properties': null, // 12 errors
        'value-no-vendor-prefix': null, // 9 errors
        'font-family-no-missing-generic-family-keyword': null, // 8 errors
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
