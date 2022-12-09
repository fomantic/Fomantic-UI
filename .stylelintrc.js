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

        // TODO
        'no-descending-specificity': null, // 11532 errors
        'rule-empty-line-before': null, // 1609 errors
        'comment-whitespace-inside': null, // 1318 errors
        'property-case': null, // 338 errors
        'max-empty-lines': null, // 279 errors
        'string-quotes': null, // 249 errors
        'declaration-empty-line-before': null, // 229 errors
        'no-duplicate-selectors': null, // 212 errors
        'selector-not-notation': null, // 169 errors
        'no-invalid-position-at-import-rule': null, // 104 errors
        'at-rule-empty-line-before': null, // 104 errors
        'at-rule-no-unknown': null, // 104 errors
        'comment-empty-line-before': null, // 78 errors
        'declaration-block-trailing-semicolon': null, // 77 errors
        'block-closing-brace-newline-before': null, // 73 errors
        'selector-list-comma-newline-after': null, // 61 errors
        'block-opening-brace-space-before': null, // 56 errors
        'import-notation': null, // 55 errors
        'at-rule-name-space-after': null, // 52 errors
        'declaration-colon-space-after': null, // 51 errors
        'function-no-unknown': null, // 43 errors
        'property-no-vendor-prefix': null, // 31 errors
        'media-feature-colon-space-before': null, // 24 errors
        'max-line-length': null, // 20 errors
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
        'selector-list-comma-space-before': null, // 6 errors
        'shorthand-property-no-redundant-values': null, // 5 errors
        'function-comma-space-after': null, // 5 errors
        'selector-combinator-space-after': null, // 3 errors
        'no-eol-whitespace': null, // 3 errors
        'block-opening-brace-newline-after': null, // 2 errors
        'declaration-block-no-duplicate-properties': null, // 2 errors
        'number-max-precision': null, // 2 errors
        'declaration-block-semicolon-space-before': null, // 2 errors
        'no-extra-semicolons': null, // 2 errors
        'declaration-colon-newline-after': null, // 1 errors
        'selector-combinator-space-before': null, // 1 errors
        'color-hex-case': null, // 1 errors
        'color-hex-length': null, // 1 errors
    },
};
