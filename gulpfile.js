/*******************************
 *           Set-up
 *******************************/

const
    gulp   = require('gulp'),

    // read user config to know what task to load
    config = require('./tasks/config/user'),

    admin = require('./tasks/collections/admin'),
    rtl = require('./tasks/collections/rtl')
;

/*******************************
 *            Tasks
 *******************************/

require('./tasks/collections/build')(gulp);
require('./tasks/collections/various')(gulp);
require('./tasks/collections/install')(gulp);

gulp.task('default', gulp.series('check-install'));

/* --------------
      Docs
--------------- */

require('./tasks/collections/docs')(gulp);

/* --------------
      RTL
--------------- */

if (config.rtl) {
    rtl(gulp);
}

/* Admin Tasks */
if (config.admin) {
    admin(gulp);
}
