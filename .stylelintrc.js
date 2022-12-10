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
        'color-function-notation': 'legacy',
        'color-hex-case': 'lower',
        'declaration-colon-newline-after': null, // handled by Prettier
        'function-no-unknown': null,
        'import-notation': null,
        indentation: null, // handled by Prettier
        linebreaks: 'unix',
        'max-line-length': null,
        'no-descending-specificity': null,
        'no-extra-semicolons': null, // handled by Prettier
        'no-duplicate-selectors': null,
        'number-max-precision': 5,
        'property-case': null,
        'property-no-vendor-prefix': [true, {
            ignoreProperties: [
                'background-clip', // https://caniuse.com/background-clip-text
                'appearance', // https://caniuse.com/css-appearance
                'backdrop-filter', // https://caniuse.com/css-backdrop-filter
                'text-size-adjust', // https://caniuse.com/text-size-adjust
            ],
        }],
        'rule-empty-line-before': null,
        'string-quotes': 'double',
        'value-keyword-case': null,

        // TODO rules to be removed/fixed in v2.10.0 as fixes are not compatible with IE11
        'alpha-value-notation': 'number', // https://caniuse.com/mdn-css_properties_opacity_percentages
        'selector-not-notation': null, // https://caniuse.com/css-not-sel-list

        // TODO
        'keyframes-name-pattern': null, // 50 errors
        'block-no-empty': null, // 25 errors
        'selector-no-vendor-prefix': null, // 19 errors
        'selector-class-pattern': null, // 19 errors
        'declaration-block-no-redundant-longhand-properties': null, // 12 errors
        'value-no-vendor-prefix': null, // 9 errors
        'font-family-no-missing-generic-family-keyword': null, // 8 errors
        'declaration-block-no-duplicate-properties': null, // 2 errors
        'font-family-no-duplicate-names': null, // 2 errors
        'function-linear-gradient-no-nonstandard-direction': null, // 1 error
        'at-rule-no-vendor-prefix': null, // 1 error
        'declaration-block-no-shorthand-property-overrides': null, // 1 error
    },
    reportNeedlessDisables: true,
};
