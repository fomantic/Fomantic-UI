module.exports = {
    extends: [
        'stylelint-config-standard-less',
    ],
    customSyntax: 'postcss-less',
    ignoreFiles: [
        'dist/**',
        'test/coverage/**',
    ],
    rules: {
        'at-rule-empty-line-before': null,
        'block-no-empty': null,
        'font-family-no-missing-generic-family-keyword': null,
        'import-notation': null,
        'keyframes-name-pattern': null,
        'no-descending-specificity': null,
        'no-duplicate-selectors': null,
        'number-max-precision': 5,
        'property-no-vendor-prefix': [true, {
            ignoreProperties: [
                'background-clip', // https://caniuse.com/background-clip-text
                'appearance', // https://caniuse.com/css-appearance
                'backdrop-filter', // https://caniuse.com/css-backdrop-filter
                'text-size-adjust', // https://caniuse.com/text-size-adjust
            ],
        }],
        'rule-empty-line-before': null,
        'value-keyword-case': null,

        // TODO rules to be removed/fixed in v2.10.0 as fixes are not compatible with IE11
        'alpha-value-notation': 'number', // https://caniuse.com/mdn-css_properties_opacity_percentages
    },
    reportNeedlessDisables: true,
};
