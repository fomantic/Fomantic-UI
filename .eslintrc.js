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
        ecmaVersion: '2020',
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
        'default-case': 'off',
        'func-names': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'linebreak-style': ['error', 'unix'],
        'max-len': 'off',
        'no-console': 'off',
        'no-continue': 'off',
        'no-lonely-if': 'off',
        'no-multi-spaces': ['error', {
            exceptions: {
                Property: true,
                VariableDeclarator: true,
            },
        }],
        'no-nested-ternary': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        'no-underscore-dangle': 'off',
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
        'unicorn/catch-error-name': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-lonely-if': 'off',
        'unicorn/no-negated-condition': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-this-assignment': 'off',
        'unicorn/numeric-separators-style': 'off',
        'unicorn/prefer-array-find': 'off',
        'unicorn/prefer-array-some': 'off', // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2007
        'unicorn/prefer-module': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'wrap-iife': ['error', 'inside'],

        // TODO rules to be removed/fixed in v2.10.0 as fixes are not compatible with IE11
        'guard-for-in': 'off', // refactor to "for of"
        'no-restricted-globals': 'off',
        'no-restricted-properties': 'off',
        'no-var': 'off', // https://github.com/fomantic/Fomantic-UI/pull/2584
        'one-var': 'off',
        'prefer-const': 'off',
        'prefer-exponentiation-operator': 'off',
        'prefer-rest-params': 'off',
        'prefer-spread': 'off',
        'semi-style': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-for-loop': 'off', // autofixes to "for of"
        'unicorn/prefer-code-point': 'off',
        'unicorn/prefer-includes': 'off',
        'unicorn/prefer-node-protocol': 'off', // needs Node 14+
        'unicorn/prefer-number-properties': 'off',
        'unicorn/prefer-optional-catch-binding': 'off',
        'unicorn/prefer-prototype-methods': 'off',
        'unicorn/prefer-reflect-apply': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prefer-top-level-await': 'off', // needs Node 14+
        'vars-on-top': 'off',

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
