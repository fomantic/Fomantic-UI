/*******************************
 *         Build Task
 *******************************/

var
  // dependencies
  gulp     = require('gulp-help')(require('gulp')),

  // config
  config   = require('./config/user'),
  install  = require('./config/project/install'),

  buildCSS = require('./build/css')
;


// sub-tasks
if (config.rtl) {
  require('./collections/rtl')(gulp);
}
require('./collections/build')(gulp);


module.exports = function (callback) {

  console.info('Building Semantic');

  if (!install.isSetup()) {
    console.error('Cannot find semantic.json. Run "gulp install" to set-up Semantic');
    return 1;
  }

  var tasks = [];
  // check for right-to-left (RTL) language
  if (config.rtl === true || config.rtl === 'Yes') {
    tasks.push(buildCSS.rtl);
  } else if (config.rtl === 'both') {
    tasks.push(buildCSS.rtl);
    tasks.push(buildCSS);
  } else {
    tasks.push(buildCSS);
  }
  tasks.push('build-javascript');
  tasks.push('build-assets');
  gulp.series(...tasks)(callback);
};
