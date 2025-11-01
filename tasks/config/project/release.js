/*******************************
         Release Config
*******************************/

const requireDotFile = require('require-dot-file');

let npmPackage;
let versionInFileName = '';

/*******************************
         Derived Values
*******************************/

const config = requireDotFile('semantic.json', process.cwd());

try {
    npmPackage = require('../../../package.json'); // eslint-disable-line global-require
} catch {
    // generate fake package
    npmPackage = {
        name: 'Unknown',
        version: 'x.x',
    };
}

// looks for the version in config or package.json (whichever is available)
const version = npmPackage && npmPackage.version !== undefined && npmPackage.name === 'fomantic-ui'
    ? npmPackage.version
    : config.version;

// looks for revision in config.
const revision = config.revision === undefined ? '' : config.revision;

const includeVersionInFileName = config.includeVersionInFileName === undefined ? false : config.includeVersionInFileName;

if (includeVersionInFileName) {
    versionInFileName = '-' + version;
    if (revision !== '') {
        versionInFileName += '-' + revision;
    }
}

/*******************************
             Export
*******************************/

module.exports = {

    title: 'Fomantic UI',
    repository: 'https://github.com/fomantic/Fomantic-UI',
    url: 'https://fomantic-ui.com/',

    banner: ''
        + '/*\n'
        + ' * # <%= title %> - <%= version %>\n'
        + ' * <%= repository %>\n'
        + ' * <%= url %>\n'
        + ' *\n'
        + ' * Copyright <%= year %> Contributors\n'
        + ' * Released under the MIT license\n'
        + ' * https://opensource.org/licenses/MIT\n'
        + ' *\n'
        + ' */\n',

    version: version,
    versionInFileName: versionInFileName,

};
