/*******************************
 Build Docs
 *******************************/

var
  gulp         = require('gulp'),

  // node dependencies
  console      = require('better-console'),
  fs           = require('fs'),
  map          = require('map-stream'),

  // gulp dependencies
  autoprefixer = require('gulp-autoprefixer'),
  chmod        = require('gulp-chmod'),
  clone        = require('gulp-clone'),
  flatten      = require('gulp-flatten'),
  gulpif       = require('gulp-if'),
  header       = require('gulp-header'),
  less         = require('gulp-less'),
  minifyCSS    = require('gulp-clean-css'),
  plumber      = require('gulp-plumber'),
  print        = require('gulp-print'),
  rename       = require('gulp-rename'),
  replace      = require('gulp-replace'),
  uglify       = require('gulp-uglify'),

  // user config
  config       = require('../config/docs'),

  // install config
  tasks        = require('../config/tasks'),
  configSetup  = require('../config/project/config'),
  install      = require('../config/project/install'),

  // metadata parsing
  metadata     = require('./metadata'),

  // build methods
  buildJS      = require('../build/javascript').buildJS,
  buildCSS     = require('../build/css').buildCSS,
  buildAssets  = require('../build/assets').buildAssets,


  // shorthand
  globs,
  assets,
  output,
  source,

  banner       = tasks.banner,
  comments     = tasks.regExp.comments,
  log          = tasks.log,
  settings     = tasks.settings
;


module.exports = function (callback) {

  var
    stream,
    compressedStream,
    uncompressedStream
  ;

  // use a different config
  config = configSetup.addDerivedValues(config);

  // shorthand
  globs  = config.globs;
  assets = config.paths.assets;
  output = config.paths.output;
  source = config.paths.source;

  /*--------------
   Parse metadata
   ---------------*/

  // parse all *.html.eco in docs repo, data will end up in
  // metadata.result object.  Note this assumes that the docs
  // repository is present and in proper directory location as
  // specified by docs.json.
  console.info('Building Metadata');
  gulp.src(config.paths.template.eco + globs.eco)
    .pipe(map(metadata.parser))
    .on('end', function () {
      fs.writeFile(output.metadata + '/metadata.json', JSON.stringify(metadata.result, null, 2), new Function());
    })
  ;

  /*--------------
    Copy Examples
  ---------------*/

  console.info('Copying examples');
  // copy src/ to server
  gulp.src('examples/**/*.*')
    .pipe(gulp.dest(output.examples))
    .pipe(print(log.created))
  ;

  /*--------------
     Copy Source
  ---------------*/

  console.info('Copying LESS source');
  // copy src/ to server
  gulp.src('src/**/*.*')
    .pipe(gulp.dest(output.less))
    .pipe(print(log.created))
  ;

  /*--------------
        Build
  ---------------*/

  console.info('Building Semantic for docs');

  if (!install.isSetup()) {
    console.error('Cannot build files. Run "gulp install" to set-up Semantic');
    callback();
    return;
  }

  gulp.parallel(
    (callback) => buildJS('docs', config, callback),
    (callback) => buildCSS('docs', false, config, {}, callback),
    (callback) => buildAssets(config, callback)
  )(callback);

};
