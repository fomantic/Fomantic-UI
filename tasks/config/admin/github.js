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

let github = new GithubAPI({
    version: '3.0.0',
    debug: true,
    protocol: 'https',
    timeout: 5000,
});

github.authenticate({
    type: 'oauth',
    token: oAuth.token,
});

module.exports = github;
