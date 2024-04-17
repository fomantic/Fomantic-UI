/*******************************
 *   Define Various Sub-Tasks
 *******************************/

const
    clean = require('../clean'),
    version = require('../version')
;

/*
  Lets you serve files to a local documentation instance
  https://github.com/fomantic/Fomantic-UI-Docs/
*/
module.exports = function (gulp) {
    gulp.task('clean', clean);
    gulp.task('clean').description = 'Clean dist folder';

    gulp.task('version', version);
    gulp.task('version').description = 'Clean dist folder';
};
