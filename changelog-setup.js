const semver = require('semver'); // eslint-disable-line import/no-extraneous-dependencies

let changelogDeps  = {},
    loopVersion = '',
    uniqueCommits = []
;
const issueLinks = function (item) {
    if (typeof loopVersion !== 'string') {
        return item;
    }
    let repository = semver.gte(loopVersion, '2.4.0') ? 'fomantic/Fomantic-UI' : 'Semantic-Org/Semantic-UI';
    item.subject = item.subject.replace(/#(\d+)([ ,]|$)/, '[`#$1`](https://github.com/' + repository + '/issues/$1) ');

    return item;
};

module.exports = function (Handlebars) {
    Handlebars.registerHelper('commit-list-enhanced', (context, options) => {
        const {
            exclude,
            message,
            subject,
            heading,
        } = options.hash;

        if (!context || context.length === 0 || !heading) {
            return '';
        }

        loopVersion = options.data.root.releases[options.data.index].tag;
        uniqueCommits = [];

        let list = context
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
            .filter((item) => {
                if (uniqueCommits.includes(item.subject)) {
                    return false;
                }
                uniqueCommits.push(item.subject);

                return true;
            })
            .map(issueLinks)
            .map((item) => options.fn(item));

        if (list.length === 0) {
            return '';
        }

        list = list.filter((item) => item.trim() !== '').sort().join('');

        let returnString = '';
        if (heading) {
            returnString = `${heading}\n\n`;
        }
        if (list) {
            returnString += `${list}\n`;
        }

        return returnString;
    });

    Handlebars.registerHelper('noprefix', (text) => {
        if (!(typeof text === 'string')) {
            return '';
        }
        let result = text.replace(/^(\w+(\([^()]+\))?:|\[[\w ]+]) */, '');

        return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('contributorlink', (text) => {
        if (!(typeof text === 'string')) {
            return '';
        }
        let result = text.replace(/add ([\dA-Za-z-]+) as a contributor/, '[`$1`](https://github.com/$1)');

        return Handlebars.helpers.noprefix(result);
    });

    Handlebars.registerHelper('commit-list-dependencies', (context, options) => {
        const {
            exclude,
            message,
            subject,
            heading,
        } = options.hash;

        if (!context || context.length === 0 || !heading) {
            return '';
        }

        loopVersion = options.data.root.releases[options.data.index].tag;

        changelogDeps = {};
        const
            depsRegex = /(?:build\(deps[A-Za-z-]*\):|\[Snyk]) (?:\[?[Ss]ecurity]? )?(?:bump|upgrade) ([\w./@-]+) from (\d+\.\d+\.\d+) to (\d+\.\d+\.\d+)/,
            detectVersionRange = function (item) {
                let subjectDetails = item.subject.match(depsRegex);
                if (!subjectDetails) {
                    return true;
                }

                let depPackage = subjectDetails[1],
                    depVersionFrom = subjectDetails[2],
                    depVersionTo = subjectDetails[3]
                ;
                if (!changelogDeps[depPackage]) {
                    changelogDeps[depPackage] = {
                        from: '999.999.999',
                        to: '0.0.0',
                    };
                }
                if (semver.lt(depVersionFrom, changelogDeps[depPackage].from)) {
                    changelogDeps[depPackage].from = depVersionFrom;
                }
                if (semver.gte(depVersionTo, changelogDeps[depPackage].to)) {
                    changelogDeps[depPackage].to = depVersionTo;

                    return true;
                }

                return false;
            },
            list = context
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
                .filter(detectVersionRange)
                // second round as the previous list came unordered from git
                .filter(detectVersionRange)
                // adjust from version to create the whole range in one line (linked to the latest commit)
                .map((item) => {
                    let subjectDetails = item.subject.match(depsRegex);
                    if (!subjectDetails) {
                        return item;
                    }
                    let
                        depPackage = subjectDetails[1],
                        depVersionFrom = subjectDetails[2]
                    ;
                    item.subject = item.subject.replace(depVersionFrom, changelogDeps[depPackage].from);

                    return item;
                })
                .map(issueLinks)
                .map((item) => options.fn(item))
                .sort()
                .join('')
        ;
        if (!list) {
            return '';
        }

        if (!heading) {
            return `${list}\n`;
        }

        return `${heading}\n\n${list}\n`;
    });
};
