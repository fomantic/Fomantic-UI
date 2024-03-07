![Fomantic Logo](https://fomantic-ui.com/images/logo.png#128)

# Fomantic-UI
The official community fork of the popular Semantic-UI framework.

[![GitHub Actions Status](https://github.com/fomantic/Fomantic-UI/workflows/CI/badge.svg)](https://github.com/fomantic/Fomantic-UI/actions)
[![last commit (develop)](https://img.shields.io/github/last-commit/fomantic/Fomantic-UI/develop.svg?label=last%20commit%20%28develop%29)](https://github.com/fomantic/Fomantic-UI/commits/develop)
[![License](https://img.shields.io/github/license/fomantic/Fomantic-UI?color=%233fb911)](https://github.com/fomantic/Fomantic-UI/blob/1fd94d2479f297c906bed557f0567d1d3f0a4d2c/LICENSE.md)

[![Discord Server](https://discordapp.com/api/guilds/453127116427493376/widget.png?style=shield)](https://discord.gg/YChxjJ3)
[![Follow on Twitter](https://img.shields.io/twitter/follow/fomanticui?style=social)](https://twitter.com/fomanticui)

[![npm downloads](https://img.shields.io/npm/dm/fomantic-ui.svg?label=npm%20downloads)](https://www.npmjs.com/package/fomantic-ui)
[![npm version](https://img.shields.io/npm/v/fomantic-ui)](https://www.npmjs.com/package/fomantic-ui)

[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/fomantic-ui/badge?style=rounded)](https://www.jsdelivr.com/package/npm/fomantic-ui)
[![CDNJS](https://img.shields.io/cdnjs/v/fomantic-ui?color=e95420)](https://cdnjs.com/libraries/fomantic-ui)

[![CI](https://github.com/fomantic/Fomantic-UI/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/fomantic/Fomantic-UI/actions/workflows/ci.yml)
[![Nightly Build](https://github.com/fomantic/Fomantic-UI/actions/workflows/nightly.yml/badge.svg?branch=develop)](https://github.com/fomantic/Fomantic-UI/actions/workflows/nightly.yml)

[![Package Quality](https://npm.packagequality.com/shield/fomantic-ui.svg?label=package%20quality)](https://packagequality.com/#?package=fomantic-ui)
[![GitHub contributors](https://img.shields.io/github/contributors/fomantic/Fomantic-UI)](https://github.com/fomantic/Fomantic-UI/graphs/contributors)
[![Dependabot Status](https://badgen.net/github/dependabot/fomantic/Fomantic-UI/?icon=dependabot)](https://github.com/features/security)
[![Known Build Dependency Vulnerabilities](https://snyk.io/test/github/fomantic/Fomantic-UI/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fomantic/Fomantic-UI?targetFile=package.json)
[![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/7496/badge)](https://bestpractices.coreinfrastructure.org/projects/7496)

---

> *NOTE:* Fomantic was created to continue active development of Semantic-UI and has the intent to be merged back into the master repository once active development can restart. For more info please read the following issues https://github.com/Semantic-Org/Semantic-UI/issues/6109 https://github.com/Semantic-Org/Semantic-UI/issues/6413
>
> *EDIT:* Lots has changed since we started this project and we are now starting the development of FUI v3. You can read more about the v3 proposals [here](https://github.com/fomantic/Fomantic-UI/issues/319).
>
> To be clear merging back into SUI is still our intention, read [this comment](https://github.com/fomantic/Fomantic-UI/issues/319#issuecomment-461736399) for more info

---

Fomantic allows developers to build beautiful websites fast, with **concise HTML**, **intuitive javascript**, and **simplified debugging**, helping make front-end development a delightful experience. Fomantic is responsively designed allowing your website to scale on multiple devices.

## 📡 Installation

```bash
$ npm install fomantic-ui
```

Living on the edge? Try our nightly build and test new features and bug fixes early!
```bash
$ npm install fomantic-ui@nightly
```

Fomantic includes an interactive installer to help setup your project.

* For more details on setup visit our [getting started guide](https://fomantic-ui.com/introduction/getting-started.html).
* To learn more about theming please read our [theming guide](https://fomantic-ui.com/usage/theming.html)

### 💻 Browser Support

* Last 2 Versions of Firefox, Chrome, Safari Mac, Edge
* Last 4 Versions of Android, Chrome for Android, iOS Safari[^1]
* IE 11[^2]
* Microsoft Edge 12-44[^2]

[^1]: Fomantic-UI should basically still work in iOS Safari 9+, Android 6+, but, starting from v2.9.0, we won't support them anymore if anything works different than in recent versions.
[^2]: Fomantic-UI should basically still work in IE11 / old Edge, but, starting from v2.9.0, we won't support them anymore in terms of dedicated bugfixes.

---

## 📦 Other packages

| Environment | Install Command                       | Repository                                                       | Third-Party |
|-------------|---------------------------------------|------------------------------------------------------------------|-------------|
| CSS Only    | `npm install fomantic-ui-css`         | [Fomantic-UI-CSS](https://github.com/fomantic/Fomantic-UI-CSS)   |             |
| LESS        | `npm install fomantic-ui-less`        | [Fomantic-UI-LESS](https://github.com/fomantic/Fomantic-UI-LESS) |             |
| SASS        | `gem 'fomantic-ui-sass'`              | [Fomantic-UI-SASS](https://github.com/fomantic/Fomantic-UI-SASS) | ✅          |

---

## 💬 Community

### 💡 Getting Help

If you're looking for help with an issue we offer multiple ways for you to get support. You can post usage questions here on GitHub
or you can ask in our community [Discord](https://discord.gg/YChxjJ3) server.

### 🐛 Submitting Bugs and Enhancements
[GitHub Issues](https://github.com/fomantic/Fomantic-UI/issues) is for suggesting enhancements and reporting bugs. Before submitting a bug make sure you do the following:
* Check to see if the issue has already been raised.
* [Fork this boilerplate JSFiddle](https://jsfiddle.net/31d6y7mn) to create a reproducible example of the bug. If a bug is apparent in the docs you can simply link to the docs example, just make it clear exactly how to reproduce the issue. Only bugs that include a test case can be triaged.
* If submitting an enhancement try and create it in the [JSFiddle](https://jsfiddle.net/31d6y7mn) if not it's fine but explain clearly what you want.

### 📝 Pull Requests

Before creating a pull request be sure to read the [Contributing Guide](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md), this is where we explain everything you need to know about contributing to Fomantic.

## Sponsors

### Cross-browser testing provided by [BrowserStack](https://www.browserstack.com)
[![BrowserStack](https://cdn.rawgit.com/fomantic/Fomantic-UI-Docs/35180e95/server/raw/images/browserstack.png)](https://www.browserstack.com)

### IDE's provided by [JetBrains](https://www.jetbrains.com?from=Fomantic-UI)
[![JetBrains](https://fomantic-ui.com/images/jetbrains.svg)](https://www.jetbrains.com?from=Fomantic-UI)

---
