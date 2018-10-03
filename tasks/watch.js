/*******************************
 Watch Task
 *******************************/

var
  gulp         = require('gulp'),

  // node dependencies
  console      = require('better-console'),
  fs           = require('fs'),
  normalize    = require('normalize-path'),

  // gulp dependencies
  autoprefixer = require('gulp-autoprefixer'),
  chmod        = require('gulp-chmod'),
  clone        = require('gulp-clone'),
  gulpif       = require('gulp-if'),
  less         = require('gulp-less'),
  minifyCSS    = require('gulp-clean-css'),
  plumber      = require('gulp-plumber'),
  print        = require('gulp-print'),
  rename       = require('gulp-rename'),
  replace      = require('gulp-replace'),
  uglify       = require('gulp-uglify'),
  util         = require('gulp-util'),
  watch        = require('gulp-watch'),

  // user config
  config       = require('./config/user'),

  // task config
  tasks        = require('./config/tasks'),
  install      = require('./config/project/install'),

  // shorthand
  globs        = config.globs,
  assets       = config.paths.assets,
  output       = config.paths.output,
  source       = config.paths.source,

  banner       = tasks.banner,
  comments     = tasks.regExp.comments,
  log          = tasks.log,
  settings     = tasks.settings,

  buildCSS     = require('./build/css')

;

// add tasks referenced using gulp.run (sub-tasks)
if (config.rtl) {
  require('./collections/rtl')(gulp);
}
require('./collections/internal')(gulp);


// export task
module.exports = function (callback) {

  if (!install.isSetup()) {
    console.error('Cannot watch files. Run "gulp install" to set-up Semantic');
    return;
  }

  // check for right-to-left (RTL) language
  if (config.rtl == 'both') {
    gulp.start('watch-rtl');
  }
  if (config.rtl === true || config.rtl === 'Yes') {
    gulp.series('watch-rtl')(callback);
    return;
  }

  //console.clear();
  console.log('Watching source files for changes');

  /*--------------
      Watch CSS
  ---------------*/

  // Always execute a full build if config files are changed
  gulp.watch(
    [
      normalize(source.config)
    ],
    gulp.series(buildCSS)
  );

  gulp.watch(
    [
      normalize(source.definitions + '/**/*.less'),
      normalize(source.site + '/**/*.{overrides,variables}'),
      normalize(source.themes + '/**/*.{overrides,variables}')
    ],
    {ignoreInitial: false},
    gulp.series(buildCSS.incremental)
  );

  /*--------------
      Watch JS
  ---------------*/

  gulp.watch(
    normalize(source.definitions + '/**/*.js'),
    {ignoreInitial: false},
    gulp.series('build-javascript')
  );

  /*--------------
    Watch Assets
  ---------------*/

  // only copy assets that match component names (or their plural)
  gulp.watch(
    normalize(source.themes + '/**/assets/**/*.*'),
    {ignoreInitial: false},
    gulp.series('build-assets')
  );

};
