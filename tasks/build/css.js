/*******************************
 *          Build Task
 *******************************/

var
  gulp         = require('gulp'),

  // node dependencies
  console      = require('better-console'),

  // gulp dependencies
  autoprefixer = require('gulp-autoprefixer'),
  chmod        = require('gulp-chmod'),
  clone        = require('gulp-clone'),
  flatten      = require('gulp-flatten'),
  gulpif       = require('gulp-if'),
  less         = require('gulp-less'),
  minifyCSS    = require('gulp-clean-css'),
  plumber      = require('gulp-plumber'),
  print        = require('gulp-print'),
  rename       = require('gulp-rename'),
  replace      = require('gulp-replace'),
  rtlcss       = require('gulp-rtlcss'),

  // config
  config       = require('../config/user'),
  tasks        = require('../config/tasks'),
  install      = require('../config/project/install'),

  // shorthand
  globs        = config.globs,
  assets       = config.paths.assets,
  output       = config.paths.output,
  source       = config.paths.source,

  comments     = tasks.regExp.comments,
  log          = tasks.log,
  settings     = tasks.settings
;

// add internal tasks (concat release)
require('../collections/internal')(gulp);

function buildCSS(rtl, opts, callback) {
  var
    stream,
    compressedStream,
    uncompressedStream
  ;

  console.info('Building CSS');

  if (!install.isSetup()) {
    console.error('Cannot build files. Run "gulp install" to set-up Semantic');
    return;
  }

  // unified css stream
  stream = gulp.src(source.definitions + '/**/' + globs.components + '.less', opts)
    .pipe(plumber(settings.plumber.less))
    .pipe(less(settings.less))
    .pipe(autoprefixer(settings.prefix))
    .pipe(gulpif(rtl, rtlcss()))
    .pipe(replace(comments.variables.in, comments.variables.out))
    .pipe(replace(comments.license.in, comments.license.out))
    .pipe(replace(comments.large.in, comments.large.out))
    .pipe(replace(comments.small.in, comments.small.out))
    .pipe(replace(comments.tiny.in, comments.tiny.out))
    .pipe(flatten())
  ;

  // two concurrent streams from same source to concat release
  uncompressedStream = stream.pipe(clone());
  compressedStream   = stream.pipe(clone());

  // uncompressed component css
  function buildUncompressed() {
    return uncompressedStream
      .pipe(plumber())
      .pipe(replace(assets.source, assets.uncompressed))
      .pipe(gulpif(rtl, rename(settings.rename.rtlCSS)))
      .pipe(gulpif(config.hasPermission, chmod(config.permission)))
      .pipe(gulp.dest(output.uncompressed))
      .pipe(print(log.created));
  }

  buildUncompressed.name        = 'build uncompressed css';
  buildUncompressed.displayName = 'build uncompressed css';

  function buildCompressed() {
    // compressed component css
    return compressedStream
      .pipe(plumber())
      .pipe(clone())
      .pipe(replace(assets.source, assets.compressed))
      .pipe(minifyCSS(settings.minify))
      .pipe(rename(rtl ? settings.rename.rtlMinCSS : settings.rename.minCSS))
      .pipe(gulpif(config.hasPermission, chmod(config.permission)))
      .pipe(gulp.dest(output.compressed))
      .pipe(print(log.created))
      ;
  }

  buildCompressed.name        = 'build compressed css';
  buildCompressed.displayName = 'build compressed css';

  gulp.parallel(
    gulp.series(buildUncompressed, 'package uncompressed' + (rtl ? ' rtl ' : ' ') + 'css'),
    gulp.series(buildCompressed, 'package compressed' + (rtl ? ' rtl ' : ' ') + 'css'),
  )(callback);
}

function full(callback) {
  buildCSS(false, {}, callback);
}

function incremental(callback) {
  buildCSS(false, {since: gulp.lastRun(incremental)}, callback);
}

function fullRTL(callback) {
  buildCSS(true, {}, callback);
}

function incrementalRTL(callback) {
  buildCSS(true, {since: gulp.lastRun(incrementalRTL)}, callback);
}

module.exports                = full;
module.exports.incremental    = incremental;
module.exports.rtl            = fullRTL;
module.exports.incrementalRTL = incrementalRTL;