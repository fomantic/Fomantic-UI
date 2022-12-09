/*******************************
 *    Define Build Sub-Tasks
 *******************************/

const watch = require('../watch');

// build sub-tasks
const build = require('../build');
const buildJS = require('../build/javascript');
const buildCSS = require('../build/css');
const buildAssets = require('../build/assets');

module.exports = function (gulp) {
    gulp.task('watch', watch);
    gulp.task('watch').description = 'Watch for site/theme changes';

    gulp.task('build', build);
    gulp.task('build').description = 'Builds all files from source';

    gulp.task('build-javascript', buildJS);
    gulp.task('build-javascript').description = 'Builds all javascript from source';

    gulp.task('build-css', buildCSS);
    gulp.task('build-css').description = 'Builds all css from source';

    gulp.task('build-assets', buildAssets);
    gulp.task('build-assets').description = 'Copies all assets from source';
};
