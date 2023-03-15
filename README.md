# gitmoji

[![Actions](https://action-badges.now.sh/segersniels/gitmoji)](https://github.com/segersniels/gitmoji/actions)[![npm](https://badge.fury.io/js/%40segersniels%2Fgitmoji.svg)](https://www.npmjs.com/package/@segersniels/gitmoji)

This project provides an easy solution for using gitmoji from your command line. Gitmoji solves the hassle of searching through the gitmoji list! 🎉

## About

A simplistic interpretation of the `carloscuesta/gitmoji-cli` repository with only basic commit functionality.

## Usage

```
Usage: gitmoji [options] [command]

A gitmoji client for using emojis on commit messages.

Options:
  -V, --version     output the version number
  -c, --commit      Interactively commit using the prompts
  -l, --list        List all the available gitmojis
  -u, --update      Sync emoji list with the repo
  --no-verify       Bypass pre-commit and commit-msg hooks
  -p, --previous    Commit using the last used commit message
  -h, --help        display help for command

Commands:
  commit [options]  Interactively commit using the prompts
  config            Configure general gitmoji behaviour
```

### Config

Configure global `gitmoji` settings through an easy prompt selection.

```
Usage: gitmoji config [options] [command]

Configure general gitmoji behaviour

Options:
  -h, --help      display help for command

Commands:
  enable          Enable behaviour
  disable         Disable behaviour
  list|ls         View the current config
  help [command]  display help for command
```

#### Examples

To disable automatic capitalization of the first character of your commit message:

```
$ gitmoji config disable
? Choose an option to disable ›
❯   capitalize-first-letter
```
