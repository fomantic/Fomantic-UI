/*******************************
         Release Config
*******************************/

const requireDotFile = require('require-dot-file');

let
    config,
    npmPackage,
    version
;

/*******************************
         Derived Values
*******************************/

config = requireDotFile('semantic.json', process.cwd());

try {
    npmPackage = require('../../../package.json'); // eslint-disable-line global-require
} catch (error) {
    // generate fake package
    npmPackage = {
        name: 'Unknown',
        version: 'x.x',
    };
}

// looks for version in config or package.json (whichever is available)
version = npmPackage && npmPackage.version !== undefined && npmPackage.name === 'fomantic-ui'
    ? npmPackage.version
    : config.version;

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

};
