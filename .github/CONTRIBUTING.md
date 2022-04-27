<img src="sm-grad-logo.png" >

# Contributing

## Getting Started

This repo uses [Husky](https://typicode.github.io/husky/#/) with [Commitlint](https://commitlint.js.org/#/) to format commit messages. To install, run:

```sh
yarn prepare
```

All commit messages should follow Commitlint's conventions, such as:

```
feat: move request detail admin tools and add twitter-specific image option
```

## Branch Conventions

The production branch for this repository is `main`, and `development` is for staging. All other branches should follow the following conventions:

- `chore/name-of-branch`: refactoring or updating existing code
- `docs/name-of-branch`: adding documentation
- `feat/name-of-branch`: creating a feature
- `fix/name-of-branch`: fixing a bug

## Making Pull Requests

All pull requests apart from deployment should be made from the feature branch to `origin/main`.

Before making a pull request, please make sure to fetch and rebase your branch with `origin/main` to ensure all previous features are included.

```sh
git rebase origin/main
```

Once your pull request has been made, make sure to fill out the checklist before merging.

## Vercel Deployments

Upon creating a pull request, Vercel will spin up a copy of the client with your changes.

> Vercel not spinning up your pull requests? Make sure you've been added to the Vercel team.