/*******************************
        Init Dist Repos
*******************************/

/*

 This task pulls the latest version of distribution from GitHub

  * Creates new repo if doesn't exist (locally & GitHub)
  * Adds remote it doesn't exist
  * Pulls latest changes from repo

*/

const
    // node dependencies
    fs        = require('fs-extra'),
    path      = require('path'),
    console   = require('@fomantic/better-console'),
    git       = require('@fomantic/gulp-git'),

    // admin files
    release   = require('../../config/admin/release'),

    // oAuth configuration for GitHub
    oAuth     = fs.pathExistsSync(path.join(__dirname, '/../../config/admin/oauth.js'))
        ? require('../../config/admin/oauth.js') // eslint-disable-line import/extensions
        : false
;

module.exports = function (callback) {
    let
        index = -1,
        total = release.distributions.length,
        timer,
        stepRepo
    ;

    if (!oAuth) {
        console.error('Must add oauth token for GitHub in tasks/config/admin/oauth.js');

        return;
    }

    // Do Git commands synchronously per component, to avoid issues
    stepRepo = function () {
        index += 1;

        if (index >= total) {
            callback();

            return;
        }

        let
            component          = release.distributions[index],
            lowerCaseComponent = component.toLowerCase(),
            outputDirectory    = path.resolve(release.outputRoot + lowerCaseComponent),
            repoName           = release.distRepoRoot + component,

            gitOptions         = { cwd: outputDirectory },
            pullOptions        = { args: '-q', cwd: outputDirectory, quiet: true },
            resetOptions       = { args: '-q --hard', cwd: outputDirectory, quiet: true },
            gitURL             = 'git@github.com:' + release.org + '/' + repoName + '.git',
            localRepoSetup     = fs.pathExistsSync(path.join(outputDirectory, '.git'))
        ;

        console.log('Processing repository: ' + outputDirectory);

        // create folder if it doesn't exist
        fs.ensureDirSync(outputDirectory);

        // clean folder
        if (release.outputRoot.startsWith('../repos')) {
            console.info('Cleaning dir', outputDirectory);
            fs.removeSync(outputDirectory);
        }

        // set-up local repo
        function setupRepo() {
            if (localRepoSetup) {
                addRemote();
            } else {
                initRepo();
            }
        }

        function initRepo() {
            console.info('Initializing repository for ' + component);
            git.init(gitOptions, function (error) {
                if (error) {
                    console.error('Error initializing repo', error);
                }
                addRemote();
            });
        }

        function addRemote() {
            console.info('Adding remote origin as ' + gitURL);
            git.addRemote('origin', gitURL, gitOptions, function () {
                pullFiles();
            });
        }

        function pullFiles() {
            console.info('Pulling ' + component + ' files');
            git.pull('origin', 'master', pullOptions, function () {
                resetFiles();
            });
        }

        function resetFiles() {
            console.info('Resetting files to head');
            git.reset('HEAD', resetOptions, function () {
                nextRepo();
            });
        }

        function nextRepo() { // eslint-disable-line unicorn/consistent-function-scoping
            // console.log('Sleeping for 1 second...');
            // avoid rate throttling
            global.clearTimeout(timer);
            timer = global.setTimeout(function () {
                stepRepo();
            }, 0);
        }

        if (localRepoSetup) {
            pullFiles();
        } else {
            setupRepo();
        }
    };

    stepRepo();
};
