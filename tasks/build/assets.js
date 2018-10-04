/*******************************
 Build Task
 *******************************/

var
  gulp    = require('gulp'),

  // gulp dependencies
  chmod   = require('gulp-chmod'),
  gulpif  = require('gulp-if'),

  // config
  config  = require('../config/user'),
  install = require('../config/project/install')
;

function buildAssets(config, callback) {
  console.info('Building assets');

  if (!install.isSetup()) {
    console.error('Cannot build files. Run "gulp install" to set-up Semantic');
    callback();
    return;
  }

  // copy assets
  function assets() {
    return gulp.src(config.paths.source.themes + '/**/assets/**/*.*', {since: gulp.lastRun('build-assets')})
      .pipe(gulpif(config.hasPermission, chmod(config.permission)))
      .pipe(gulp.dest(config.paths.output.themes))
      ;
  }

  gulp.series(assets)(callback);
}

module.exports = function (callback) {
  buildAssets(config, callback);
};

module.exports.buildAssets = buildAssets;