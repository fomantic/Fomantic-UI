const eslint = require('eslint');
const ruleComposer = require('eslint-rule-composer');

const rule = new eslint.Linter().getRules().get('no-extra-parens');

module.exports = ruleComposer.filterReports(
    rule,
    (problem) => {
        if (problem.node.type === 'ConditionalExpression'
            && (problem.node.parent.type === 'ConditionalExpression' || problem.node.parent.type === 'SpreadElement')
        ) {
            return false;
        }

        return problem;
    }
);
