// node
const fs = require('fs')
const path = require('path')

// npm
const fetch = require('node-fetch')

// pkg
const pkg = require('../package.json')

const ghBase = 'https://api.github.com'
const repoUrlPath = 'fomantic/Fomantic-UI'

const run = async function () {
  return fetch(`${ghBase}/repos/${repoUrlPath}/milestones`)
    .then(r => r.json())
    .then(milestones => milestones.filter(m => m.title.indexOf('x') === -1)[0].title)
}

run()
  .then(nextVersion => {
    pkg.version = nextVersion
  })
  .then(() => {
    fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(pkg, null, 2))
  })
  .then(() => console.log('Done'))
