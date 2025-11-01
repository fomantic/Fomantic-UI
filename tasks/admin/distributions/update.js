/*******************************
          Update Repos
*******************************/

/*

 This task update all SUI individual distribution repos with new versions of distributions

  * Commits changes from create repo
  * Pushes changes to GitHub
  * Tag new releases if the version changed in main repo

*/

// node dependencies
const fs = require('node:fs');
const path = require('node:path');
const console = require('@fomantic/better-console');
const gulp = require('gulp');
const git = require('@fomantic/gulp-git');

// admin files
const release = require('../../config/admin/release');
const project = require('../../config/project/release');

// oAuth configuration for GitHub
const oAuth = fs.existsSync(path.join(__dirname, '/../../config/admin/oauth.js'))
    ? require('../../config/admin/oauth.js') // eslint-disable-line import/extensions
    : false;

// shorthand
const version = project.version;

module.exports = function (callback) {
    const github = require('../../config/admin/github'); // eslint-disable-line global-require

    let index = -1;
    const total = release.distributions.length;
    let timer;

    if (!oAuth) {
        console.error('Must add oauth token for GitHub in tasks/config/admin/oauth.js');

        return;
    }

    // Do the Git commands synchronously per distribution, to avoid issues
    const stepRepo = function () {
        index += 1;
        if (index >= total) {
            callback();

            return;
        }

        const distribution = release.distributions[index];
        const outputDirectory = path.resolve(path.join(release.outputRoot, distribution.toLowerCase()));
        const repoName = release.distRepoRoot + distribution;

        const commitArgs = oAuth.name !== undefined && oAuth.email !== undefined
            ? '--author "' + oAuth.name + ' <' + oAuth.email + '>"'
            : '';

        const distributionPackage = fs.existsSync(outputDirectory + 'package.json')
            ? require(outputDirectory + 'package.json') // eslint-disable-line global-require, import/no-dynamic-require
            : false;

        const isNewVersion = version && distributionPackage.version !== version;

        const commitMessage = isNewVersion
            ? 'Updated distribution to version ' + version
            : 'Updated files from main repo';

        const gitOptions = { cwd: outputDirectory, encoding: false };
        const commitOptions = { args: commitArgs, cwd: outputDirectory };
        const releaseOptions = { tag_name: version, owner: release.org, repo: repoName };

        const fileModeOptions = { args: 'config core.fileMode false', cwd: outputDirectory };
        const usernameOptions = { args: 'config user.name "' + oAuth.name + '"', cwd: outputDirectory };
        const emailOptions = { args: 'config user.email "' + oAuth.email + '"', cwd: outputDirectory };
        const versionOptions = { args: 'rev-parse --verify HEAD', cwd: outputDirectory };

        const localRepoSetup = fs.existsSync(path.join(outputDirectory, '.git'));
        const canProceed = true;

        console.info('Processing repository:' + outputDirectory);

        function setConfig() {
            git.exec(fileModeOptions, function () {
                git.exec(usernameOptions, function () {
                    git.exec(emailOptions, function () {
                        commitFiles();
                    });
                });
            });
        }

        // standard path
        function commitFiles() {
            // commit files
            console.info('Committing ' + distribution + ' files', commitArgs);
            gulp.src('./', gitOptions)
                .pipe(git.add(gitOptions))
                .pipe(git.commit(commitMessage, commitOptions), function () {})
                .on('error', function () {
                    // canProceed = false; bug in git commit <https://github.com/stevelacy/gulp-git/issues/49>
                })
                .on('finish', function () {
                    if (canProceed) {
                        pushFiles();
                    } else {
                        console.info('Nothing new to commit');
                        nextRepo();
                    }
                });
        }

        // push changes to remote
        function pushFiles() {
            console.info('Pushing files for ' + distribution);
            git.push('origin', 'master', { args: '', cwd: outputDirectory }, function () {
                console.info('Push completed successfully');
                getSHA();
            });
        }

        // gets SHA of last commit
        function getSHA() {
            git.exec(versionOptions, function (error, version) {
                version = version.trim();
                createRelease(version);
            });
        }

        // create release on GitHub.com
        function createRelease(version) {
            if (version) {
                releaseOptions.target_commitish = version;
            }
            github.repos.createRelease(releaseOptions, function () {
                nextRepo();
            }).then();
        }

        // Steps to the next repository
        function nextRepo() {
            console.log('Sleeping for 1 second...');
            // avoid rate throttling
            global.clearTimeout(timer);
            timer = global.setTimeout(stepRepo, 100);
        }

        if (localRepoSetup) {
            setConfig();
        } else {
            console.error('Repository must be setup before running update distributions');
        }
    };

    stepRepo();
};
