/*******************************
 *     Define RTL Sub-Tasks
 *******************************/

const
    buildRTL = require('../rtl/build'),
    watchRTL = require('../rtl/watch')
;

module.exports = function (gulp) {
    gulp.task('watch-rtl', watchRTL);
    gulp.task('watch-rtl').description = 'DEPRECATED - use \'watch\' instead - Watch files as RTL';

    gulp.task('build-rtl', buildRTL);
    gulp.task('build-rtl').description = 'DEPRECATED - use \'build\' instead - Build all files as RTL';
};
