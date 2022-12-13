const eslint = require('eslint');
const ruleComposer = require('eslint-rule-composer');

const rule = new eslint.Linter().getRules().get('eqeqeq');

module.exports = ruleComposer.filterReports(
    rule,
    (problem) => {
        if (problem.node.type === 'BinaryExpression'
            && (problem.node.operator === '==' || problem.node.operator === '!=')
            && problem.node.right.type === 'Literal'
        ) {
            return problem;
        }

        return false;
    }
);
