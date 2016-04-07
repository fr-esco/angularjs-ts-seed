
# GIT SVN COMMANDS



## Checkout project

```
git svn clone https://oneleo-code.au-sdc.com/svn/platform-assets/poc/wag-ue-poc/ ue-showcase --trunk=trunk/ue-showcase --branches=branches --tags=tags --prefix=svn/
```

## Checkout last revision

get list of revisions 
```
svn log --stop-on-copy https://oneleo-code.au-sdc.com/svn/platform-assets/poc/wag-ue-poc/trunk/ue-showcase

------------------------------------------------------------------------
r9855 | bsorrentino | 2016-03-22 12:13:10 +0100 (Tue, 22 Mar 2016) | 1 line

update from origin
```
Pick up the revision on first row, in the example r9855, and run commnand

```
git svn clone -r<revision number> https://oneleo-code.au-sdc.com/svn/platform-assets/poc/wag-ue-poc/ ue-showcase --trunk=trunk/ue-showcase --branches=branches --tags=tags --prefix=svn/
```

## Pull from SVN

```
git svn rebase
```

## Push to SVN

```
git svn dcommit
```

## Download new revisions from SVN

```
git svn fetch [--fetch-all]
```

## Create a svn branches

```
git svn branch <branch name>
```

## Create a svn tag

```
git svn branch --tag <tag name>
```

## Checkout a svn branch

```
git checkout -b <local branch name> svn/<svn branch name>
```
