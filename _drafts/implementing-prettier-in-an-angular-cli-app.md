---
layout: post
title: Implementing Prettier in an Angular CLI app
date: 2018-03-18
tags: Angular
---

Keeping a consisent code style is not an easy task when working with a large team. Each developer has his own
preferences and styling habits. It often leads to long discussions and a lot of time wasted in code reviews. To adress
this problem we recently decided to implement Prettier in our Angular CLI application. Prettier is an opinionated
code formatter which automates all formatting and cleans up our existing codebase.

## Getting started
To get started we need to install all dependencies required to run Prettier:

- [Prettier](https://github.com/prettier/prettier)
The code formatter
- [Pretty-quick](https://github.com/azz/pretty-quick)
This package will run Prettier on all our changed files
- [Husky](https://github.com/typicode/husky)
Allows us to use [git hooks](https://git-scm.com/docs/githooks)

``` bash
npm install --save-dev prettier pretty-quick husky
```

## Configuration
Even thought it is an opinionated formatter, there are still a handful of format options we can customize. Create a `.prettierrc` config file in the root of your project folder and add the following options to the file:

``` json
{
  "useTabs": false,
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": false,
  "trailingComma": "none",
  "jsxBracketSameLine": false,
  "parser": "babylon",
  "noSemi": true,
  "rcVerbose": true
}
```

This is the default setup for Prettier. You can adapt the file to your team's preferences. Check the [Prettier documentation](https://prettier.io/docs/en/options.html) for more information about each option.

## Running the formatter
Add the following to the `scripts` section of the project's `package.json` file:

``` json
"scripts": {
  ...
  "precommit": "pretty-quick --staged"
}
```

From now on every file that was changed in a new commit will automatically be formated for you.
