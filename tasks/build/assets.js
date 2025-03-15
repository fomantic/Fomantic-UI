/*******************************
 Build Task
 *******************************/

const gulp = require('gulp');

// gulp dependencies
const chmod = require('gulp-chmod');
const gulpif = require('gulp-if');
const normalize = require('normalize-path');
const print = require('gulp-print').default;

// config
const config = require('../config/user');
const tasks = require('../config/tasks');
const install = require('../config/project/install');

const log = tasks.log;

function build(src, config) {
    return gulp.src(src, { base: config.paths.source.themes, encoding: false })
        .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
        .pipe(gulp.dest(config.paths.output.themes))
        .pipe(print(log.created));
}

function buildAssets(src, config, callback) {
    if (!install.isSetup()) {
        console.error('Cannot build assets. Run "gulp install" to set-up Fomantic');
        callback();

        return;
    }

    if (callback === undefined) {
        callback = config;
        config = src;
        src = config.paths.source.themes + '/**/assets/**/*.*';
    }

    // copy assets
    let assets = () => build(src, config);
    assets.displayName = 'Building Assets';

    gulp.series(assets)(callback);
}

module.exports = function (callback) {
    buildAssets(config, callback);
};

module.exports.watch = function (type, config) {
    gulp
        .watch([normalize(config.paths.source.themes + '/**/assets/**/*.*')])
        .on('all', function (event, path) {
            console.log('Change in assets detected');

            return gulp.series((callback) => buildAssets(path, config, callback))();
        });
};

module.exports.buildAssets = buildAssets;
