/*******************************
 Build Task
 *******************************/

var
  gulp    = require('gulp'),

  // gulp dependencies
  chmod   = require('gulp-chmod'),
  gulpif  = require('gulp-if'),
  print   = require('gulp-print').default,

  // config
  config  = require('../config/user'),
  tasks   = require('../config/tasks'),
  install = require('../config/project/install'),

  log     = tasks.log
;

function build(config) {
  return gulp.src(config.paths.source.themes + '/**/assets/**/*.*', {since: gulp.lastRun('build-assets')})
    .pipe(gulpif(config.hasPermission, chmod(config.permission)))
    .pipe(gulp.dest(config.paths.output.themes))
    .pipe(print(log.created))
    ;
}

function buildAssets(config, callback) {
  if (!install.isSetup()) {
    console.error('Cannot build assets. Run "gulp install" to set-up Semantic');
    callback();
    return;
  }

  // copy assets
  var assets         = () => build(config);
  assets.displayName = "Building Assets";

  gulp.series(assets)(callback);
}

module.exports = function (callback) {
  buildAssets(config, callback);
};

module.exports.buildAssets = buildAssets;