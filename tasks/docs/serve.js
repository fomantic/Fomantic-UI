/*******************************
 Serve Docs
 *******************************/

const extend = require('extend');

// node dependencies
const console = require('@fomantic/better-console');
const gulp = require('gulp');

// gulp dependencies
const print = require('gulp-print').default;

// user config
const configDocs = require('../config/docs');

// task config
const tasks = require('../config/tasks');
const configSetup = require('../config/project/config');

// shorthand
const log = tasks.log;

const css = require('../build/css');
const js = require('../build/javascript');
const assets = require('../build/assets');

module.exports = function (callback) {
    // use a different config
    const config = extend(true, {}, configDocs);
    configSetup.addDerivedValues(config);

    console.clear();
    console.log('Watching source files for changes');

    /* --------------
       Copy Source
    --------------- */

    gulp
        .watch(['src/**/*.*'])
        .on('all', function (event, path) {
            // We don't handle deleted files yet
            if (event === 'unlink' || event === 'unlinkDir') {
                return;
            }

            return gulp.src(path, {
                base: 'src/',
                encoding: false,
            })
                .pipe(gulp.dest(config.paths.output.less))
                .pipe(print(log.created));
        });

    /* --------------
      Copy Examples
    --------------- */

    gulp
        .watch(['examples/**/*.*'])
        .on('all', function (event, path) {
            // We don't handle deleted files yet
            if (event === 'unlink' || event === 'unlinkDir') {
                return;
            }

            return gulp.src(path, {
                base: 'examples/',
                encoding: false,
            })
                .pipe(gulp.dest(config.paths.output.examples))
                .pipe(print(log.created));
        });

    /* --------------
        Watch CSS
    --------------- */

    css.watch('docs', config);

    /* --------------
        Watch JS
    --------------- */

    js.watch('docs', config);

    /* --------------
      Watch Assets
    --------------- */

    assets.watch('docs', config);

    callback();
};
