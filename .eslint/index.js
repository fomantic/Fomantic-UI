const eqeqeqRule = require('./eqeqeq-rule');
const noExtraParensRule = require('./no-extra-parens-rule');

module.exports = {
    rules: {
        eqeqeq: eqeqeqRule,
        'no-extra-parens': noExtraParensRule,
    },
    configs: {
        recommended: {
            plugins: [
                '@internal/eslint-plugin',
            ],
            rules: {
                // fixes only variable == (or !=) literal expression
                '@internal/eqeqeq': ['error', 'always'],
                // https://github.com/eslint/eslint/issues/16626
                // https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/errors.js#L66
                '@internal/no-extra-parens': ['error', 'all', {
                    conditionalAssign: true,
                    enforceForArrowConditionals: false,
                    ignoreJSX: 'all',
                    nestedBinaryExpressions: false,
                    returnAssign: false,
                }],
            },
        },
    },
};
