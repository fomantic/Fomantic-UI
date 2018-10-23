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
 * Builds the css
 * @param type
 * @param compress
 * @param config
 * @param opts
 * @return {*}
 */
function build(type, compress, config, opts) {
  var fileExtension;
  if (type === 'rtl' && compress) {
    fileExtension = settings.rename.rtlMinCSS;
  } else if (type === 'rtl') {
    fileExtension = settings.rename.rtlCSS;
  } else if (compress) {
    fileExtension = settings.rename.minCSS;
  }

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
    .pipe(replace(config.paths.assets.source,
      compress ? config.paths.assets.compressed : config.paths.assets.uncompressed))
    .pipe(gulpif(compress, minifyCSS(settings.minify)))
    .pipe(gulpif(fileExtension, rename(fileExtension)))
    .pipe(header(banner, settings.header))
    .pipe(gulpif(config.hasPermission, chmod(config.permission)))
    .pipe(gulp.dest(compress ? config.paths.output.compressed : config.paths.output.uncompressed))
    .pipe(print(log.created))
    ;
}

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

function buildCSS(type, config, opts, callback) {
  if (!install.isSetup()) {
    console.error('Cannot build CSS files. Run "gulp install" to set-up Semantic');
    callback();
    return;
  }

  var buildUncompressed         = () => build(type, false, config, opts);
  buildUncompressed.displayName = 'Building uncompressed CSS';

  var buildCompressed         = () => build(type, true, config, opts);
  buildCompressed.displayName = 'Building compressed CSS';

  var packUncompressed         = () => pack(type, false);
  packUncompressed.displayName = 'Packing uncompressed CSS';

  var packCompressed         = () => pack(type, true);
  packCompressed.displayName = 'Packing compressed CSS';


  gulp.parallel(
    gulp.series(buildUncompressed, packUncompressed),
    gulp.series(buildCompressed, packCompressed)
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