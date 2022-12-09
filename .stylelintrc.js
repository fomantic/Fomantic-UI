module.exports = {
    extends: [
        // TODO 'stylelint-config-standard',
    ],
    customSyntax: 'postcss-less',
    ignoreFiles: [
        'dist/**',
        'test/coverage/**',
    ],
    rules: {
        indentation: 4,
    },
};
