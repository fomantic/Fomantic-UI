/*******************************
 Build Task
 *******************************/

const gulp = require('gulp');

// node dependencies
const console = require('@fomantic/better-console');

// gulp dependencies
const chmod = require('gulp-chmod');
const concat = require('gulp-concat');
const dedupe = require('@fomantic/gulp-dedupe');
const flatten = require('gulp-flatten');
const gulpif = require('gulp-if');
const header = require('@fomantic/gulp-header');
const normalize = require('normalize-path');
const ordered = require('ordered-read-streams');
const plumber = require('@fomantic/gulp-plumber');
const print = require('gulp-print').default;
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');

// config
const config = require('../config/user');
const docsConfig = require('../config/docs');
const tasks = require('../config/tasks');
const install = require('../config/project/install');

// shorthand
const globs = config.globs;
const assets = config.paths.assets;

const banner = tasks.banner;
const filenames = tasks.filenames;
const comments = tasks.regExp.comments;
const log = tasks.log;
const settings = tasks.settings;

/**
 * Concat and uglify the JavaScript files
 * @param {string|array} src - source files
 * @param type
 * @param config
 * @return {*}
 */
function build(src, type, config) {
    return gulp.src(src)
        .pipe(plumber())
        .pipe(flatten())
        .pipe(replace(comments.license.in, comments.license.out))
        .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
        .pipe(gulp.dest(config.paths.output.uncompressed))
        .pipe(print(log.created))
        .pipe(uglify(settings.uglify))
        .pipe(rename(settings.rename.minJS))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
        .pipe(gulp.dest(config.paths.output.compressed))
        .pipe(print(log.created));
}

/**
 * Packages the JavaScript files in dist
 * @param {string} type - type of the js processing (none, rtl, docs)
 * @param {boolean} compress - should the output be compressed
 */
function pack(type, compress) {
    const output = type === 'docs' ? docsConfig.paths.output : config.paths.output;
    const concatenatedJS = compress ? filenames.concatenatedMinifiedJS : filenames.concatenatedJS;

    let src = globs.components
        .replace(/[{}]/g, '')
        .split(',')
        .map((c) => gulp.src(output.uncompressed + '/**/' + c + globs.ignored + '.js'));

    return ordered(src)
        .pipe(plumber())
        .pipe(dedupe())
        .pipe(replace(assets.uncompressed, assets.packaged))
        .pipe(concat(concatenatedJS))
        .pipe(gulpif(config.stripHeaders, replace(comments.header.in, comments.header.out)))
        .pipe(gulpif(compress, uglify(settings.concatUglify)))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermissions, chmod(config.parsedPermissions)))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created));
}

function buildJS(src, type, config, callback) {
    if (!install.isSetup()) {
        console.error('Cannot build Javascript. Run "gulp install" to set-up Fomantic');
        callback();

        return;
    }

    if (callback === undefined) {
        callback = config;
        config = type;
        type = src;
        src = config.paths.source.definitions + '/**/' + config.globs.components + (config.globs.ignored || '') + '.js';
    }

    if (globs.individuals !== undefined && typeof src === 'string') {
        const components = config.globs.components.replace(/[{}]/g, '') + ',' + config.globs.individuals.replace(/[{}]/g, '');

        src = config.paths.source.definitions + '/**/{' + components + '}' + (config.globs.ignored || '') + '.js';
    }

    // copy source javascript
    const js = () => build(src, type, config);
    js.displayName = 'Building un/compressed Javascript';

    const packUncompressed = () => pack(type, false);
    packUncompressed.displayName = 'Packing uncompressed Javascript';

    const packCompressed = () => pack(type, true);
    packCompressed.displayName = 'Packing compressed Javascript';

    gulp.series(js, gulp.parallel(packUncompressed, packCompressed))(callback);
}

module.exports = function (callback) {
    buildJS(false, config, callback);
};

// We keep the changed files in an array to call build with all of them at the same time
let timeout;
let files = [];

module.exports.watch = function (type, config) {
    gulp
        .watch([normalize(config.paths.source.definitions + '/**/*.js')])
        .on('all', function (event, path) {
            // We don't handle deleted files yet
            if (event === 'unlink' || event === 'unlinkDir') {
                return;
            }

            // Clear timeout
            if (timeout) {
                clearTimeout(timeout);
            }

            // Add the file to the internal changed files array
            if (!files.includes(path)) {
                files.push(path);
            }

            // Update timeout
            timeout = setTimeout(() => {
                console.log('Change in javascript detected');
                // Copy files to build in another array
                const buildFiles = [...files];
                // Call method
                gulp.series((callback) => buildJS(buildFiles, type, config, callback))();
                // Reset internal changed files array
                files = [];
            }, 1000);
        });
};

module.exports.buildJS = buildJS;
