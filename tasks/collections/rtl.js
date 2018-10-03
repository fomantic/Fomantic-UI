/*******************************
 *        Define Sub-Tasks
 *******************************/

module.exports = function (gulp) {

  var
    // rtl
    buildRTL = require('./../rtl/build'),
    watchRTL = require('./../rtl/watch')
  ;

  gulp.task('watch-rtl', watchRTL);
  gulp.task('watch-rtl').description = 'Watch files as RTL';

  gulp.task('build-rtl', buildRTL);
  gulp.task('build-rtl').description = 'Build all files as RTL';

};
