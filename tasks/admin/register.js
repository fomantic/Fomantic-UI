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
const repos = [release.distributions, ...release.components];
const total = repos.length;
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
        const repo = repos[index].toLowerCase();
        const outputDirectory = release.outputRoot + repo + '/';
        const exec = process.exec;
        const execSettings = { cwd: outputDirectory };
        const updateNPM = 'npm publish;meteor publish;';

        /* Register with NPM */
        exec(updateNPM, execSettings, function (err, stdout, stderr) {
            console.log(err, stdout, stderr);
            stepRepo();
        });
    };
    stepRepo();
};
