# **Sponsorr! - frontend**

## Description

Sponsorr! is a machine learning powered platform that matches event organisers with sponsors.

# Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Run unit testing

```
# To fire up local firestore emulator
1. npm run start:firestore

# To run unit testing
2. npm run test:firestore
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Version Control and Collaboration (Github)

Run this in bash/terminal before running anything important:

```
git status
```

## Working with master branch

### Before Starting

```
git pull --rebase
```

### Pushing Changes

```
git add [filename]
```

```
git commit -m "[Commit message]"
```

```
git status
```

```
git push
```

## Working With Other Branches

### Creating New Branch

```
git checkout -b feature/[name of feature]
```

### Moving Between Branches

```
git checkout [name of branch]
```

## SOP After Making Changes

**Important**: Create new Pull Request. Once all conflicts and issues have been resolved, proceed to merge.

### Alternative Merge Method

In your master branch:

```
git pull --rebase
```

In your development branch:

```
git merge master
```

In your master branch:

```
git merge branch
```

**Note:** Only do this when you are absolutely sure that there will be no merge conflicts. Otherwise always do a pull request. This is for convenience and to prevent confusion.

### Resolving Merge Conflicts

1. Notify all parties affected
2. Resolve conflict together using Github's online **Web Editor**
3. Delete redundant files. This is also an effective way to resolve merge conflicts

## Deleting Branch After Merge

Three choices for deleting development branches:

### Delete via Pull Request

When confirming merge to master using pull requests, select the option to delete branch

### Delete via Terminal

to delete remote branch:

```
git push origin --delete development
```

to delete local branch:

```
git branch -d development
```

# Development Workflow

1. File an issue (see Project board)

2. Open a new branch and work on the issue (follow branch naming and commit message conventions)

3. Pull request and code review

4. Merge and close issue
