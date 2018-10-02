/*******************************
        Define Sub-Tasks
*******************************/

module.exports = function(gulp) {

  var
    // build sub-tasks
    buildJS      = require('./../build/javascript'),
    buildCSS     = require('./../build/css'),
    buildAssets  = require('./../build/assets')
  ;

  // in case these tasks are undefined during import, less make sure these are available in scope
  gulp.task('build-javascript', buildJS);
  gulp.task('build-javascript').description = 'Builds all javascript from source';
  gulp.task('build-css', buildCSS);
  gulp.task('build-css').description = 'Builds all css from source';
  gulp.task('build-assets', buildAssets);
  gulp.task('build-assets').description = 'Copies all assets from source';

};
