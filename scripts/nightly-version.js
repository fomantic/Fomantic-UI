// node
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const process = require('process');

// npm
const fetch = require('node-fetch'); // eslint-disable-line import/no-extraneous-dependencies
const semver = require('semver'); // eslint-disable-line import/no-extraneous-dependencies
const actions = require('@actions/core');

const pkg = require('../package.json');

const ghBase = 'https://api.github.com';
const repoUrlPath = 'fomantic/Fomantic-UI';
const npmBase = 'https://registry.npmjs.org';
const npmPackage = 'fomantic-ui';
const currentRev = childProcess // get the current rev from the repo
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
    .slice(0, 7)
;

const getNextVersion = async function () {
    const versions = await fetch(`${ghBase}/repos/${repoUrlPath}/milestones`)
        .then((r) => r.json())
        .then((milestones) => milestones.filter((m) => m.title.indexOf('x') === -1)) // remove all versions with `x` in it
        .then((versions) => versions.map((m) => m.title)) // create array of versions
        .then((versions) => semver.sort(versions))
    ;

    // Return first entry aka the smallest version in milestones which would therefore
    // be the next version
    return semver.parse(versions[0]);
};

const getPublishedVersion = async function () {
    // get the latest published nightly tagged version
    return semver.parse(
        await fetch(`${npmBase}/${npmPackage}`)
            .then((r) => r.json())
            .then((p) => {
                let nightly = p['dist-tags'].nightly ?? '';
                let versionInfo = p.versions[nightly] ?? {};
                let buildCommit = nightly.indexOf('+') === -1 && versionInfo.gitHead
                    ? '+' + (versionInfo.gitHead ?? '').slice(0, 7)
                    : '';

                return nightly + buildCommit;
            })
    );
};

const getNightlyVersion = async function () {
    const next = semver.parse(await getNextVersion());
    const current = semver.parse(await getPublishedVersion());

    if (current.build[0] === currentRev) {
        actions.setOutput('shouldPublish', false);

        console.log('No new commits since last publish. Exiting.');
        process.exit(0); // eslint-disable-line unicorn/no-process-exit

        return;
    }

    let nightlyVersion = `${next.version}-beta.0`;

    // Check if published version is the same version as next version.
    // Only check major, minor and patch as previously published nightly
    // versions would include prerelease tag and build metadata
    if (semver.eq(`${next.major}.${next.minor}.${next.patch}`, `${current.major}.${current.minor}.${current.patch}`)) {
        // If they match then a nightly version has already been published, so we need to increment
        // the prerelease and add the new rev as build metadata
        nightlyVersion = semver.inc(
            `${next.version}-beta.${current.prerelease[1]}`,
            'prerelease'
        );
    }

    actions.setOutput('shouldPublish', 'yes');

    return `${nightlyVersion}+${currentRev}`;
};

getNightlyVersion()
    .then((nightlyVersion) => {
        pkg.version = nightlyVersion;
    })
    .then(() => {
        fs.writeFileSync(
            path.resolve(__dirname, '../package.json'),
            JSON.stringify(pkg, null, 2)
        );
    })
    .then(() => console.log(`Done (${pkg.version})`))
;
