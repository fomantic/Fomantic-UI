/*******************************
             Set-up
*******************************/

const
    // npm dependencies
    fs              = require('fs'),
    path            = require('path'),
    extend          = require('extend'),
    requireDotFile  = require('require-dot-file'),

    // semantic.json defaults
    defaults        = require('./defaults'),
    config          = require('./project/config')
;

let
    // Final config object
    gulpConfig = {},

    // semantic.json settings
    userConfig
;

/*******************************
          User Config
*******************************/

try {
    // looks for config file across all parent directories
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
