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
        'block-closing-brace-newline-before': null,
        'declaration-block-trailing-semicolon': null, // bad formatting with "each()"
        'declaration-empty-line-before': null,
        indentation: 4,
        'max-line-length': null,
        'no-extra-semicolons': null, // fix GH-1832 - workaround for wikimedia/less.php parser
        'rule-empty-line-before': null,

        // TODO
        'no-descending-specificity': null, // 11541 errors
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
        'number-leading-zero': null, // 49 errors
        'color-function-notation': null, // 32 errors
        'alpha-value-notation': null, // 32 errors
        'color-hex-case': null, // 32 errors
        'block-no-empty': null, // 25 errors
        'selector-no-vendor-prefix': null, // 19 errors
        'selector-class-pattern': null, // 19 errors
        'number-no-trailing-zeros': null, // 16 errors
        'font-family-name-quotes': null, // 13 errors
        'declaration-block-no-redundant-longhand-properties': null, // 12 errors
        'value-keyword-case': null, // 12 errors
        'value-no-vendor-prefix': null, // 9 errors
        'color-hex-length': null, // 9 errors
        'block-closing-brace-newline-after': null, // 9 errors
        'no-empty-source': null, // 8 errors
        'font-family-no-missing-generic-family-keyword': null, // 8 errors
        'number-max-precision': null, // 7 errors
        'selector-attribute-quotes': null, // 7 errors
        'shorthand-property-no-redundant-values': null, // 5 errors
        'function-url-quotes': null, // 5 errors
        'function-comma-newline-after': null, // 5 errors
        'no-empty-first-line': null, // 3 errors
        'declaration-block-no-duplicate-properties': null, // 2 errors
        'font-family-no-duplicate-names': null, // 2 errors
        'function-linear-gradient-no-nonstandard-direction': null, // 1 error
        'at-rule-no-vendor-prefix': null, // 1 error
        'declaration-block-no-shorthand-property-overrides': null, // 1 error
    },
    reportNeedlessDisables: true,
};
