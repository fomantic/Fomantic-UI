# Contributing to Fomantic-UI

### :notebook: Support Questions

Questions regarding usage and support can be asked in [GitHub Issues](https://github.com/fomantic/Fomantic-UI/issues) but if your question starts to become a conversation we will ask you to move it into our [Discord](https://discordapp.com/invite/YChxjJ3). If you are looking for quick support [Discord](https://discordapp.com/invite/YChxjJ3) is the best place to ask.

After asking your question you may find that it is actually a bug or a feature which doesn't exist. At this point it's a good idea to submit a GitHub issue (if you haven't already) to request/report your issue. When you open an issue please use the issue templates and fill in as many of the sections as you can. This helps us triage issues without needing to ask lots of questions.

### Bugs & Enhancements

#### :bug: Reporting Bugs

We use [GitHub Issues](https://github.com/fomantic/Fomantic-UI/issues) to track all bugs and enhancements for FUI, before raising a bug please check to see if it has already been raised. If you find it has already been raised add a :thumbsup: to the issue reactions to show you are also having the same issue. Please do not spam "+1", "bump" etc.

If you find that your issue has not already been raised please create a [new issue](https://github.com/fomantic/Fomantic-UI/issues/new?template=Bug_report.md) and please follow the template provided.

When creating an issue you will be asked to create a [JSFiddle](https://jsfiddle.net/31d6y7mn) to replicate your issue. You can fork [this template](https://jsfiddle.net/31d6y7mn) which has the latest version of Fomantic ready to use.

#### :crystal_ball: Requesting Features

We also use [GitHub Issues](https://github.com/fomantic/Fomantic-UI/issues) for new feature requests. Before submitting a new issue please check to see if it has already been requested. If you find that your issue has not already been requested feel free create a [new issue](https://github.com/fomantic/Fomantic-UI/issues/new?template=Feature_request.md) and please follow the template provided. This helps us triage issues without needing to ask lots of questions.

When you create the issue please when possible include pictures or a [JSFiddle](https://jsfiddle.net/31d6y7mn), this can help contributors understand what your asking.

##### Naming Issues

When you create an issue please follow our naming convention this makes it easy to scan over issues.

**Bugs:** [Scope] x does not do y
**Enhancements:** [Scope] x should do y

The scope is the component which has the issue or enhancement e.g. Segment, Grid, Dropdown etc. when you describe the issue in the summary keep it brief 60 characters max.

##### Tracking Issue Progress

As bugs and features are triaged they will be assigned to milestones. The best indication of when a change will land is to check the date on the  [upcoming milestones](https://github.com/fomantic/Fomantic-UI/milestones) page.

### :pencil: Pull Requests Guide

**All pull requests should be merged into the `develop` branch. Make sure your branch is based from our develop branch and not the master.**

Anyone can jump on the issues board and grab off bugs to fix. This is probably the best way to become a contributor to Fomantic. We only ask you to stick to these few rules to make it easier to merge/process your pull requests.

- When you implement a new feature or fix a bug think about backwards compatibility. If your change is backwards compatible it is most likely to be merged sooner since you won't need to wait for a breaking change update.
- Please commit using the [AngularJS Git Commit Message Convention](https://gist.github.com/stephenparish/9941e89d80e2bc58a153) this is more of a nice to have and isn't required.
- Please try and stick to a similar code style so everyone can read your code.
- When you commit don't include your dist files, this can cause merge conflicts and also adds unnecessary changes to the PR.

#### Setup your environment
These few steps are the easiest way to setup your dev environment.

1. Fork the [main repository](https://github.com/fomantic/Fomantic-UI).
2. Clone your fork and add the main repository as a remote
```bash
$ git clone https://github.com/<YOUR_GITHUB_USERNAME>/Fomantic-UI.git
$ cd Fomantic-UI
$ git remote add fui https://github.com/fomantic/Fomantic-UI.git
$ git fetch fui
```
3. Checkout a new branch with the FUI `develop` branch as the base
```bash
$ git checkout -b <BRANCH_NAME> fui/develop
```

Now you can start working on your change. Once you submit your PR remember to merge into the `develop` branch NOT `master`.

### The [CONTRIBUTORS](CONTRIBUTORS.md) list

Once you contribute to the project you can be added the the contributors list for any categories you have contributed towards. If you think you should be on the list but aren't already you can request to be added via the [`all-contributors` bot](https://allcontributors.org/docs/en/bot/overview).
