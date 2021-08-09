// node
const fs = require('fs')
const path = require('path')

// npm
const fetch = require('node-fetch')
const semver = require('semver')

// pkg
const pkg = require('../package.json')

const ghBase = 'https://api.github.com'
const repoUrlPath = 'fomantic/Fomantic-UI'
const npmBase = 'https://registry.npmjs.org'
const npmPackage = 'fomantic-ui'


const getGitHubVersion = async function () {
  return fetch(`${ghBase}/repos/${repoUrlPath}/milestones`)
    .then(r => r.json())
    .then(milestones => milestones.filter(m => m.title.indexOf('x') === -1).map(m => m.title).sort()[0])
}

const getCurrentNpmVersion = async function () {
  return fetch(`${npmBase}/${npmPackage}`)
    .then(r => r.json())
    .then(p => p['dist-tags'].nightly)
}

const getNpmPreRelease = async function () {
  return fetch(`${npmBase}/${npmPackage}`)
    .then(r => r.json())
    .then(p => p['dist-tags'].nightly)
    .then(v => semver.prerelease(v))
    .then(pr => pr === null ? ['beta', 0] : pr)
}

const getAllNpmVersions = async function () {
  // The versions property sometimes does not include versions which are in "time"!
  // That's why "time" is used here
  return fetch(`${npmBase}/${npmPackage}`)
      .then(r => r.json())
      .then(p => Object.keys(p['time']))
}

const getNightlyVersion = async function () {
  const nextVersion = await getGitHubVersion()
  const currentNightlyWithPre = semver.parse(await getCurrentNpmVersion())
  const currentNightly = `${currentNightlyWithPre.major}.${currentNightlyWithPre.minor}.${currentNightlyWithPre.patch}`
  const allNpmVersions = await getAllNpmVersions()
  let nightlyVersion = `${nextVersion}-beta.0`

  if (semver.eq(nextVersion, currentNightly)) {
    const preRelease = await getNpmPreRelease()

    nightlyVersion = semver.inc(
      `${nextVersion}-${preRelease[0]}.${preRelease[1]}`,
      'prerelease'
    )
  }
  //check if version was already uploaded to npm previously
   while (allNpmVersions.indexOf(nightlyVersion) !== -1) {
    nightlyVersion = semver.inc(
        nightlyVersion,
        'prerelease'
    )
  }

  return nightlyVersion
}

getNightlyVersion()
  .then(nightlyVersion => {
    pkg.version = nightlyVersion
  })
  .then(() => {
    fs.writeFileSync(
      path.resolve(__dirname, '../package.json'),
      JSON.stringify(pkg, null, 2)
    )
  })
  .then(() => console.log(`Done (${pkg.version})`))
