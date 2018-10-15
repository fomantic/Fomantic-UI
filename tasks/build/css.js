/*******************************
 *          Build Task
 *******************************/

const
  gulp         = require('gulp'),

  // node dependencies
  console      = require('better-console'),

  // gulp dependencies
  autoprefixer = require('gulp-autoprefixer'),
  chmod        = require('gulp-chmod'),
  clone        = require('gulp-clone'),
  concatCSS    = require('gulp-concat-css'),
  dedupe       = require('gulp-dedupe'),
  flatten      = require('gulp-flatten'),
  gulpif       = require('gulp-if'),
  header       = require('gulp-header'),
  less         = require('gulp-less'),
  minifyCSS    = require('gulp-clean-css'),
  plumber      = require('gulp-plumber'),
  print        = require('gulp-print').default,
  rename       = require('gulp-rename'),
  replace      = require('gulp-replace'),
  rtlcss       = require('gulp-rtlcss'),

  // config
  config       = require('./../config/user'),
  docsConfig   = require('./../config/docs'),
  tasks        = require('../config/tasks'),
  install      = require('../config/project/install'),

  // shorthand
  globs        = config.globs,
  assets       = config.paths.assets,

  banner       = tasks.banner,
  filenames    = tasks.filenames,
  comments     = tasks.regExp.comments,
  log          = tasks.log,
  settings     = tasks.settings
;

/**
 * Packages the css files in dist
 * @param {string} type - type of the css processing (none, rtl, docs)
 * @param {boolean} compress - should the output be compressed
 */
function pack(type, compress) {
  const output       = type === 'docs' ? docsConfig.paths.output : config.paths.output;
  const ignoredGlobs = type === 'rtl' ? globs.ignoredRTL + '.rtl.css' : globs.ignored + '.css';

  let concatenatedCSS;
  if (type === 'rtl') {
    concatenatedCSS = compress ? filenames.concatenatedMinifiedRTLCSS : filenames.concatenatedRTLCSS;
  } else {
    concatenatedCSS = compress ? filenames.concatenatedMinifiedCSS : filenames.concatenatedCSS;
  }

  return gulp.src(output.uncompressed + '/**/' + globs.components + ignoredGlobs)
    .pipe(plumber())
    .pipe(dedupe())
    .pipe(replace(assets.uncompressed, assets.packaged))
    .pipe(concatCSS(concatenatedCSS, settings.concatCSS))
    .pipe(gulpif(config.hasPermission, chmod(config.permission)))
    .pipe(gulpif(compress, minifyCSS(settings.concatMinify)))
    .pipe(header(banner, settings.header))
    .pipe(gulp.dest(output.packaged))
    .pipe(print(log.created))
    ;
}
pack.displayName = 'Package CSS';

function defaultStream(type, config, opts) {
  return gulp.src(config.paths.source.definitions + '/**/' + config.globs.components + '.less', opts)
    .pipe(plumber(settings.plumber.less))
    .pipe(less(settings.less))
    .pipe(autoprefixer(settings.prefix))
    .pipe(gulpif(type === 'rtl', rtlcss()))
    .pipe(replace(comments.variables.in, comments.variables.out))
    .pipe(replace(comments.license.in, comments.license.out))
    .pipe(replace(comments.large.in, comments.large.out))
    .pipe(replace(comments.small.in, comments.small.out))
    .pipe(replace(comments.tiny.in, comments.tiny.out))
    .pipe(flatten())
    ;
}

function buildCSS(type, config, opts, callback) {
  console.info('Building CSS');

  if (!install.isSetup()) {
    console.error('Cannot build files. Run "gulp install" to set-up Semantic');
    callback();
    return;
  }

  // uncompressed component css
  function buildUncompressed() {
    return defaultStream(type, config, opts)
      .pipe(plumber())
      .pipe(replace(config.paths.assets.source, config.paths.assets.uncompressed))
      .pipe(gulpif(type === 'rtl', rename(settings.rename.rtlCSS)))
      .pipe(header(banner, settings.header))
      .pipe(gulpif(config.hasPermission, chmod(config.permission)))
      .pipe(gulp.dest(config.paths.output.uncompressed))
      .pipe(print(log.created));
  }

  buildUncompressed.name        = 'build uncompressed css';
  buildUncompressed.displayName = 'build uncompressed css';

  function buildCompressed() {
    // compressed component css
    return defaultStream(type, config, opts)
      .pipe(plumber())
      .pipe(clone())
      .pipe(replace(config.paths.assets.source, config.paths.assets.compressed))
      .pipe(minifyCSS(settings.minify))
      .pipe(rename(type === 'rtl' ? settings.rename.rtlMinCSS : settings.rename.minCSS))
      .pipe(header(banner, settings.header))
      .pipe(gulpif(config.hasPermission, chmod(config.permission)))
      .pipe(gulp.dest(config.paths.output.compressed))
      .pipe(print(log.created))
      ;
  }

  buildCompressed.name        = 'build compressed css';
  buildCompressed.displayName = 'build compressed css';

  gulp.parallel(
    gulp.series(buildUncompressed, () => pack(type, false)),
    gulp.series(buildCompressed, () => pack(type, true)),
  )(callback);
}

function full(callback) {
  buildCSS(false, config, {}, callback);
}

function incremental(callback) {
  buildCSS(false, config, {since: gulp.lastRun(incremental)}, callback);
}

function fullRTL(callback) {
  buildCSS('rtl', config, {}, callback);
}

function incrementalRTL(callback) {
  buildCSS('rtl', config, {since: gulp.lastRun(incrementalRTL)}, callback);
}

// Default tasks
module.exports                = full;
module.exports.incremental    = incremental;
// RTL tasks
module.exports.rtl            = fullRTL;
module.exports.incrementalRTL = incrementalRTL;
// Expose build css method
module.exports.buildCSS       = buildCSS;