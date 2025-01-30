const semver = require('semver'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function (Handlebars) {
    Handlebars.registerHelper('commit-list-heading-only', (context, options) => {
        const {
            exclude,
            message,
            subject,
            heading,
        } = options.hash;

        if (!context || context.length === 0 || !heading) {
            return '';
        }

        const list = context
            .filter((item) => {
                const commit = item.commit || item;
                if (exclude) {
                    const pattern = new RegExp(exclude, 'm');
                    if (pattern.test(commit.message)) {
                        return false;
                    }
                }
                if (message) {
                    const pattern = new RegExp(message, 'm');

                    return pattern.test(commit.message);
                }
                if (subject) {
                    const pattern = new RegExp(subject);

                    return pattern.test(commit.subject);
                }

                return true;
            })
            .map((item) => options.fn(item))
            .join('');

        if (!list) {
            return '';
        }

        return `${heading}\n\n`;
    });

    Handlebars.registerHelper('noprefix', function (text) {
        var result = text.replace(/^(fix|feat|build)\(.*\): */, '');
        return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('commit-list-heading-only', (context, options) => {
        const { exclude, message, subject, heading } = options.hash;
        let changelogDeps  = {};

        if (!context || context.length === 0 || !heading) {
            return '';
        }

        const list = context
            .filter(item => {
                const commit = item.commit || item;
                if (exclude) {
                    const pattern = new RegExp(exclude, 'm');
                    if (pattern.test(commit.message)) {
                        return false;
                    }
                }
                if (message) {
                    const pattern = new RegExp(message, 'm');

                    return pattern.test(commit.message);
                }
                if (subject) {
                    const pattern = new RegExp(subject);

                    return pattern.test(commit.subject);
                }

                return true;
            }) /*
            .map(item => {
                let subjectDetails = item.subject.match(/build\(deps.*\): bump (.*) from.*to (.*)/),
                    depPackage = subjectDetails[1],
                    depVersion = subjectDetails[2],
                    existingVersion = changelogDeps[depPackage] || '0.0.0',
                    returnValue = 'abc '
                ;
                if (semver.gt(depVersion, existingVersion)) {
                    changelogDeps[depPackage] = existingVersion;
                    returnValue = depPackage + ' to ' + depPackage;
                }
            }) */
            .map((item) => options.fn(item))
            .join('')
        ;

        if (!list) {
            return '';
        }

        if (!heading) {
            return list;
        }

        return `${heading}\n\n${list}`;

        // build\(deps.*\): bump (.*) from.*to (.*)

        if (!context || !context.subject) {
            return '';
        }
        let subjectDetails = context.subject.match(/build\(deps.*\): bump (.*) from.*to (.*)/),
            depPackage = subjectDetails[1],
            depVersion = subjectDetails[2],
            existingVersion = changelogDeps[depPackage] || '0.0.0',
            returnValue = 'abc '
        ;
        if (semver.gt(depVersion, existingVersion)) {
            changelogDeps[depPackage] = existingVersion;
            returnValue = depPackage + ' to ' + depPackage;
        }

        return returnValue;
    })
};
