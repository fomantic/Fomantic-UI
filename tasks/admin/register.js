/*******************************
          Register PM
*******************************/

/*
  Task to register component repos with Package Managers
  * Registers a component with bower
  * Registers a component with NPM
*/

// node dependencies
const process = require('child_process');

// config
const release = require('../config/admin/release');

let
    // register components and distributions
    repos   = release.distributions.concat(release.components),
    total   = repos.length,
    index   = -1,

    stepRepo
;

module.exports = function (callback) {
    console.log('Registering repos with package managers');

    // Do the Git commands synchronously per component, to avoid issues
    stepRepo = function () {
        index += 1;
        if (index >= total) {
            callback();

            return;
        }
        let
            repo            = repos[index].toLowerCase(),
            outputDirectory = release.outputRoot + repo + '/',
            exec            = process.exec,
            execSettings    = { cwd: outputDirectory },
            updateNPM       = 'npm publish;meteor publish;'
        ;

        /* Register with NPM */
        exec(updateNPM, execSettings, function (err, stdout, stderr) {
            console.log(err, stdout, stderr);
            stepRepo();
        });
    };
    stepRepo();
};
