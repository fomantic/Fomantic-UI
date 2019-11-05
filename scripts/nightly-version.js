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
    .then(milestones => milestones.filter(m => m.title.indexOf('x') === -1)[0].title)
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

const getNightlyVersion = async function () {
  const nextVersion = await getGitHubVersion()
  const currentNightly = await getCurrentNpmVersion()

  if (semver.minor(nextVersion) === semver.minor(currentNightly)) {
    const preRelease = await getNpmPreRelease()

    return semver.inc(
      `${nextVersion}-${preRelease[0]}.${preRelease[1]}`,
      'prerelease'
    )
  } else {
    return `${nextVersion}-beta.1`
  }
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
