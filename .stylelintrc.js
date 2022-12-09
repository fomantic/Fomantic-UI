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
        indentation: 4,
        'at-rule-empty-line-before': null,
        'block-closing-brace-newline-before': null,
        'declaration-block-trailing-semicolon': null, // bad formatting with "each()"
        'declaration-empty-line-before': null,
        'max-line-length': null,
        'rule-empty-line-before': null,

        // TODO
        'no-descending-specificity': null, // 11532 errors
        'property-case': null, // 338 errors
        'string-quotes': null, // 249 errors
        'no-duplicate-selectors': null, // 212 errors
        'selector-not-notation': null, // 169 errors
        'no-invalid-position-at-import-rule': null, // 104 errors
        'at-rule-no-unknown': null, // 104 errors
        'selector-list-comma-newline-after': null, // 61 errors
        'import-notation': null, // 55 errors
        'function-no-unknown': null, // 43 errors
        'property-no-vendor-prefix': null, // 31 errors
        'selector-no-vendor-prefix': null, // 19 errors
        'number-leading-zero': null, // 19 errors
        'declaration-block-no-redundant-longhand-properties': null, // 12 errors
        'block-closing-brace-empty-line-before': null, // 11 errors
        'value-keyword-case': null, // 11 errors
        'value-no-vendor-prefix': null, // 9 errors
        'keyframes-name-pattern': null, // 9 errors
        'color-function-notation': null, // 8 errors
        'alpha-value-notation': null, // 8 errors
        'selector-attribute-quotes': null, // 7 errors
        'number-no-trailing-zeros': null, // 6 errors
        'shorthand-property-no-redundant-values': null, // 5 errors
        'block-opening-brace-newline-after': null, // 2 errors
        'declaration-block-no-duplicate-properties': null, // 2 errors
        'number-max-precision': null, // 2 errors
        'color-hex-case': null, // 1 error
        'color-hex-length': null, // 1 error
    },
};
