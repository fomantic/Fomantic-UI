module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
    ],
    parserOptions: {
        ecmaVersion: '2020',
        sourceType: 'module',
    },
    ignorePatterns: [
        '/dist',
        '/examples/assets/library',
        '/test/coverage',
        '/test/helpers',
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'keyword-spacing': ['error'],
        'brace-style': ['error'],
        curly: ['error'],
        quotes: ['error', 'single', { avoidEscape: true }],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            functions: 'never',
            imports: 'always-multiline',
            exports: 'always-multiline',
        }],
        semi: ['error'],
        'no-extra-semi': ['error'],
        'no-trailing-spaces': ['error'],
    },
    reportUnusedDisableDirectives: true,
};
