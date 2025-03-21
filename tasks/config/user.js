/*******************************
             Set-up
*******************************/

// npm dependencies
const extend = require('extend');
const requireDotFile = require('require-dot-file');

// semantic.json defaults
const defaults = require('./defaults');
const config = require('./project/config');

// Final config object
let gulpConfig;

// semantic.json settings
let userConfig;

/*******************************
          User Config
*******************************/

try {
    // looks for a config file across all parent directories
    userConfig = requireDotFile('semantic.json', process.cwd());
    if (userConfig.valueOf() === false) {
        console.error('No semantic.json config found');
    }
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
        console.error('require-dot-file module not found');
    }
}

// extend user config with defaults
gulpConfig = !userConfig
    ? extend(true, {}, defaults)
    : extend(false, {}, defaults, userConfig);

/*******************************
       Add Derived Values
*******************************/

// adds calculated values
config.addDerivedValues(gulpConfig);

/*******************************
             Export
*******************************/

module.exports = gulpConfig;
