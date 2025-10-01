module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
        'plugin:unicorn/recommended',
        'plugin:@internal/eslint-plugin/recommended',
    ],
    parserOptions: {
        ecmaVersion: '2021',
        sourceType: 'module',
    },
    ignorePatterns: [
        '!.*',
        '/dist',
        '/examples/assets/library',
        '/test/coverage',
        '/test/helpers',
    ],
    rules: {
        'brace-style': ['error', '1tbs'],
        'class-methods-use-this': 'off',
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
            imports: 'always-multiline',
            objects: 'always-multiline',
        }],
        'consistent-return': 'off',
        curly: ['error', 'all'],
        'func-names': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'linebreak-style': ['error', 'unix'],
        'max-len': 'off',
        'no-console': 'off',
        'no-nested-ternary': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        'no-unused-vars': 'off',
        'object-shorthand': ['error', 'never'],
        'padding-line-between-statements': ['error', {
            blankLine: 'always',
            next: ['continue', 'break', 'export', 'return', 'throw'],
            prev: '*',
        }],
        'prefer-destructuring': 'off',
        'prefer-template': 'off',
        'spaced-comment': ['error', 'always', {
            block: {
                balanced: true,
                exceptions: ['*'],
                markers: ['!'],
            },
            line: {
                exceptions: ['-', '+'],
                markers: ['/'],
            },
        }],
        strict: 'off',
        'unicorn/no-anonymous-default-export': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-negated-condition': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-this-assignment': 'off',
        'unicorn/prefer-array-find': 'off',
        'unicorn/prefer-array-some': 'off', // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2007
        'unicorn/prefer-at': 'off',
        'unicorn/prefer-global-this': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-string-raw': 'off',
        'unicorn/prefer-string-replace-all': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'wrap-iife': ['error', 'inside'],

        // TODO rules to be removed/fixed in v2.10.0 as fixes are not compatible with IE11
        'no-restricted-globals': 'off',
        'no-restricted-properties': 'off',
        'prefer-const': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/prefer-number-properties': 'off',
        'unicorn/prefer-reflect-apply': 'off',
        'unicorn/prefer-top-level-await': 'off', // needs Node 14+

        // TODO rules with a lot of errors to be fixed manually, fix in a separate PR
        eqeqeq: 'off', // about 20 errors to be fixed manually
        'no-shadow': 'off', // about 220 errors to be fixed manually
        'prefer-arrow-callback': 'off', // about 350 errors (all autofixable)
    },
    reportUnusedDisableDirectives: true,
    globals: {
        jQuery: true,
    },
    overrides: [{
        files: ['**/*.ts'],
        parser: '@typescript-eslint/parser',
        extends: [
            'plugin:@typescript-eslint/recommended',
        ],
        rules: {
            // https://typescript-eslint.io/rules/no-use-before-define#how-to-use
            'no-use-before-define': 'off',

            // TODO rules with a lot of errors to be fixed manually, fix in a separate PR
            '@typescript-eslint/ban-types': 'off', // 16 eslint errors only, help wanted!
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
        },
    }],
};
