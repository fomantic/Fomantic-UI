/*******************************
 *     Define Docs Sub-Tasks
 *******************************/

// docs tasks
const
    buildDocs = require('../docs/build'),
    serveDocs = require('../docs/serve')
;

/*
  Lets you serve files to a local documentation instance
  https://github.com/fomantic/Fomantic-UI-Docs/
*/
module.exports = function (gulp) {
    gulp.task('serve-docs', serveDocs);
    gulp.task('serve-docs').description = 'Serve file changes to SUI Docs';

    gulp.task('build-docs', buildDocs);
    gulp.task('build-docs').description = 'Build all files and add to SUI Docs';
};
