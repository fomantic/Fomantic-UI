/*******************************
 *         Build Task
 *******************************/

// dependencies
const gulp = require('gulp');

// config
const install = require('./config/project/install');

module.exports = function (callback) {
    console.info('Building Fomantic');

    if (!install.isSetup()) {
        console.error('Cannot find semantic.json. Run "gulp install" to set-up Fomantic');

        return 1;
    }

    gulp.series('build-css', 'build-javascript', 'build-assets')(callback);
};
