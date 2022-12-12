/*******************************
 *           Set-up
 *******************************/

let
    gulp   = require('gulp'),

    // read user config to know what task to load
    config = require('./tasks/config/user') // eslint-disable-line import/extensions
;

/*******************************
 *            Tasks
 *******************************/

require('./tasks/collections/build')(gulp); // eslint-disable-line import/extensions
require('./tasks/collections/various')(gulp); // eslint-disable-line import/extensions
require('./tasks/collections/install')(gulp); // eslint-disable-line import/extensions

gulp.task('default', gulp.series('watch'));

/* --------------
      Docs
--------------- */

require('./tasks/collections/docs')(gulp); // eslint-disable-line import/extensions

/* --------------
      RTL
--------------- */

if (config.rtl) {
    require('./tasks/collections/rtl')(gulp); // eslint-disable-line import/extensions
}
