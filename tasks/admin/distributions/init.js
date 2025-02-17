/*******************************
        Init Dist Repos
*******************************/

/*

 This task pulls the latest version of distribution from GitHub

  * Creates new repo if doesn't exist (locally & GitHub)
  * Adds remote it doesn't exists
  * Pulls latest changes from repo

*/

const
    // node dependencies
    fs        = require('fs'),
    path      = require('path'),
    del       = require('del'),
    console   = require('@fomantic/better-console'),
    gulp      = require('gulp'),
    git       = require('@fomantic/gulp-git'),
    mkdirp    = require('mkdirp'),

    // admin files
    release   = require('../../config/admin/release'),
    project   = require('../../config/project/release'),

    // oAuth configuration for GitHub
    oAuth     = fs.existsSync(path.join(__dirname, '/../../config/admin/oauth.js'))
        ? require('../../config/admin/oauth.js') // eslint-disable-line import/extensions
        : false,

    // shorthand
    version = project.version
;

module.exports = function (callback) {
    const github = require('../../config/admin/github'); // eslint-disable-line global-require

    let
        index = -1,
        total = release.distributions.length,
        timer,
        stream,
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
            repoURL            = 'https://github.com/' + release.org + '/' + repoName + '/',
            localRepoSetup     = fs.existsSync(path.join(outputDirectory, '.git'))
        ;

        console.log('Processing repository: ' + outputDirectory);

        // create folder if doesn't exist
        if (!fs.existsSync(outputDirectory)) {
            mkdirp.sync(outputDirectory);
        }

        // clean folder
        if (release.outputRoot.startsWith('../repos')) {
            console.info('Cleaning dir', outputDirectory);
            del.sync([outputDirectory + '**/*'], { silent: true, force: true });
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

        function createRepo() {
            console.info('Creating GitHub repo ' + repoURL);
            github.repos.createFromOrg({
                org: release.org,
                name: repoName,
                homepage: release.homepage,
            }, function () {
                setupRepo();
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
            git.pull('origin', 'master', pullOptions, function (error) {
                resetFiles();
            });
        }

        function resetFiles() {
            console.info('Resetting files to head');
            git.reset('HEAD', resetOptions, function (error) {
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
            // createRepo() only use to create remote repo (easier to do manually)
        }
    };

    stepRepo();
};
