/*******************************
          GitHub Login
*******************************/
/*
  Logs into GitHub using OAuth
*/

const
    fs          = require('fs'),
    path        = require('path'),
    GithubAPI   = require('@octokit/rest'),

    // stores oauth info for GitHub API
    oAuth       = fs.existsSync(path.join(__dirname, './oauth.js'))
        ? require('./oauth.js') // eslint-disable-line import/extensions
        : false
;

if (!oAuth) {
    console.error('Must add oauth token for GitHub in tasks/config/admin/oauth.js');
}

let github = new GithubAPI.Octokit({
    auth: oAuth.token,
});

module.exports = github;
