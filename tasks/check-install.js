/*******************************
 *        Check Install
 *******************************/

var
  // node dependencies
  gulp    = require('gulp'),
  console = require('better-console'),
  install = require('./config/project/install')
;

// export task
module.exports = function (callback) {

  setTimeout(function () {
    if (!install.isSetup()) {
      console.log('Starting install...');
      gulp.series('install')(callback);
    } else {
      gulp.series('watch')(callback);
    }
  }, 50); // Delay to allow console.clear to remove messages from check event

};