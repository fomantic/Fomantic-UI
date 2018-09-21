# Contributing to Fomantic-UI

### :notebook: Support Questions

Questions regarding usage and support can be asked in [GitHub Issues](https://github.com/fomantic/Fomantic-UI/issues) but if your question starts to become a conversation we will ask you to move it into our [Discord](https://discordapp.com/invite/YChxjJ3). If you are looking for quick support [Discord](https://discordapp.com/invite/YChxjJ3) is the best place to ask.

After asking your question you may find that it is actually a bug or the feature you wanting doesn't exist. At this point it's a good idea to submit a GitHub issue (if you haven't already) to request/report your issue.

### Bugs & Enhancements

#### :bug: Reporting Bugs

We use [GitHub Issues](https://github.com/fomantic/Fomantic-UI/issues) to track all bugs and enhancements for FUI, before raising a bug please check to see if it has already been raised. If you find it has already been raised add a :thumbsup: to the issue reactions to show you are also having the same issue. Please do not spam "+1", "bump" etc.

If you find that your issue has not already been raised please create a [new issue](https://github.com/fomantic/Fomantic-UI/issues/new?template=Bug_report.md) please follow and fill in the template provided this helps us gather the correct information we need to triage issues.

When creating an issue you will be asked to create a [JSFiddle](https://jsfiddle.net/31d6y7mn) to replicate your issue. You can fork [this template](https://jsfiddle.net/31d6y7mn) which has the latest version of Fomantic ready to use.

#### :crystal_ball: Requesting Features

We also use [GitHub Issues](https://github.com/fomantic/Fomantic-UI/issues) for new feature requests. Before submitting a new issue please check to see if it has already been requested. If you find that your issue has not already been requested feel free create a [new issue](https://github.com/fomantic/Fomantic-UI/issues/new?template=Feature_request.md) please follow and fill in the template provided this helps us gather the correct information we need to triage issues.

When you create the issue please when possible include pictures or a [JSFiddle](https://jsfiddle.net/31d6y7mn), this can help contributors understand what your asking.

##### Naming Issues

When you create an issue please follow our naming convention this makes it easy to scan over issues.

**Bugs:** [Scope] x does not do y
**Enhancements:** [Scope] x should do y

The scope is the component which has the issue or enhancement e.g. Segment, Grid, Dropdown etc. when you describe the issue in the summary keep it brief 60 characters max.

##### Tracking Issue Progress

As bugs and features are triaged they will be assigned to milestones. The best indication of when a change will land is to check the date on the  [upcoming milestones](https://github.com/fomantic/Fomantic-UI/milestones) page.

### :pencil: Pull Requests Guide

**All pull requests should be merged into the `beta` branch.**

Anyone can jump on the issues board and grab off bugs to fix. This is probably the best way to become a contributor to Fomantic. We only ask you to stick to these few rules to make it easier to merge/process your pull requests.

- When you implement a new feature or fix a bug think about backwards compatibility. If your change is backwards compatible it is most likely to be merged sooner since you won't need to wait for a breaking change update.
- Please commit using the [AngularJS Git Commit Message Convention](https://gist.github.com/stephenparish/9941e89d80e2bc58a153) this is more of a nice to have and isn't required.
- Please try and stick to a similar code style so everyone can read your code.
- When you commit don't include your dist files, this add changes when your create your PR which aren't needed.
