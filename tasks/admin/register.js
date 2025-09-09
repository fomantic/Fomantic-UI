/*******************************
          Register PM
*******************************/

/*
  Task to register component repos with Package Managers
  * Registers a component with bower
  * Registers a component with NPM
*/

// node dependencies
const process = require('node:child_process');

// config
const release = require('../config/admin/release');

// register components and distributions
let repos = [release.distributions, ...release.components];
let total = repos.length;
let index = -1;

let stepRepo;

module.exports = function (callback) {
    console.log('Registering repos with package managers');

    // Do the Git commands synchronously per component, to avoid issues
    stepRepo = function () {
        index += 1;
        if (index >= total) {
            callback();

            return;
        }
        let repo = repos[index].toLowerCase();
        let outputDirectory = release.outputRoot + repo + '/';
        let exec = process.exec;
        let execSettings = { cwd: outputDirectory };
        let updateNPM = 'npm publish;meteor publish;';

        /* Register with NPM */
        exec(updateNPM, execSettings, function (err, stdout, stderr) {
            console.log(err, stdout, stderr);
            stepRepo();
        });
    };
    stepRepo();
};
