/*******************************
 *    Admin Task Collection
 *******************************/

// less/css distributions
const initComponents = require('../admin/components/init');
const createComponents = require('../admin/components/create');
const updateComponents = require('../admin/components/update');

// single component releases
const initDistributions = require('../admin/distributions/init');
const createDistributions = require('../admin/distributions/create');
const updateDistributions = require('../admin/distributions/update');

const release = require('../admin/release');
const publish = require('../admin/publish');
const register = require('../admin/register');

/*
  These are tasks to be run by project maintainers
  - Creating Component Repos
  - Syncing with GitHub via APIs
  - Modifying package files
*/

/*******************************
 *            Tasks
 *******************************/

module.exports = function (gulp) {
    /* Release */
    gulp.task('init distributions', initDistributions);
    gulp.task('init distributions').description = 'Grabs each component from GitHub';

    gulp.task('create distributions', createDistributions);
    gulp.task('create distributions').description = 'Updates files in each repo';

    gulp.task('init components', initComponents);
    gulp.task('init components').description = 'Grabs each component from GitHub';

    gulp.task('create components', createComponents);
    gulp.task('create components').description = 'Updates files in each repo';

    /* Publish */
    gulp.task('update distributions', updateDistributions);
    gulp.task('update distributions').description = 'Commits component updates from create to GitHub';

    gulp.task('update components', updateComponents);
    gulp.task('update components').description = 'Commits component updates from create to GitHub';

    /* Tasks */
    gulp.task('release', release);
    gulp.task('release').description = 'Stages changes in GitHub repos for all distributions';

    gulp.task('publish', publish);
    gulp.task('publish').description = 'Publishes all releases (components, package)';

    gulp.task('register', register);
    gulp.task('register').description = 'Registers all packages with NPM';
};
