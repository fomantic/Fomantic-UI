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
        'space-in-parens': ['error'],
        'comma-spacing': ['error'],
        'comma-style': ['error', 'last', {
            // https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L54
            exceptions: {
                ArrayExpression: false,
                ArrayPattern: false,
                ArrowFunctionExpression: false,
                CallExpression: false,
                FunctionDeclaration: false,
                FunctionExpression: false,
                ImportDeclaration: false,
                ObjectExpression: false,
                ObjectPattern: false,
                VariableDeclaration: false,
                NewExpression: false,
            },
        }],
        'space-before-function-paren': ['error', {
            named: 'never',
            anonymous: 'always',
            asyncArrow: 'always',
        }],
        'space-infix-ops': ['error'],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'computed-property-spacing': ['error', 'never'],
        'space-before-blocks': ['error'],
        'one-var-declaration-per-line': ['error', 'always'],
        'function-paren-newline': ['error', 'multiline-arguments'],
        'padding-line-between-statements': ['error', {
            blankLine: 'always',
            prev: '*',
            next: ['continue', 'break', 'export', 'return', 'throw'],
        }],
        'spaced-comment': ['error', 'always', {
            line: {
                markers: ['/'],
                exceptions: ['-', '+'],
            },
            block: {
                markers: ['!'],
                exceptions: ['*'],
                balanced: true,
            },
        }],
        'padded-blocks': ['error', 'never'],
        'no-multiple-empty-lines': ['error', {
            max: 1,
            maxBOF: 0,
            maxEOF: 0,
        }],
        'no-multi-spaces': ['error', {
            exceptions: {
                Property: true,
                VariableDeclarator: true,
            },
        }],
        'brace-style': ['error'],
        curly: ['error'],
        'object-shorthand': ['error', 'never'],
        'object-curly-newline': ['error', {
            // https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/style.js#L395
            ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
            ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
            ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
            ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
        }],
        'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
        'dot-notation': ['error', { allowKeywords: true }],
        'arrow-parens': ['error'],
        quotes: ['error', 'single', { avoidEscape: true }],
        'quote-props': ['error', 'as-needed', {
            keywords: false,
            numbers: false,
        }],
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
        'array-callback-return': ['error', { allowImplicit: true }],
    },
    reportUnusedDisableDirectives: true,
};
