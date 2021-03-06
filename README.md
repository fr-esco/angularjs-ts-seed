<!--- [![Angular Style Guide](https://img.shields.io/badge/Angular%20Style%20Guide-1.x%20ES2015-orange.svg?style=flat)](https://github.com/toddmotto/angular-styleguide) --->
[![GitHub tag](https://img.shields.io/github/tag/fr-esco/angularjs-ts-seed.svg?maxAge=2592000)]()
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/fr-esco/angularjs-ts-seed.svg)](https://david-dm.org/fr-esco/angularjs-ts-seed)
[![devDependency Status](https://david-dm.org/fr-esco/angularjs-ts-seed/dev-status.svg)](https://david-dm.org/fr-esco/angularjs-ts-seed#info=devDependencies)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/fr-esco/angularjs-ts-seed)

# Introduction

A seed project for AngularJS apps written in *TypeScript*.

_This project is inspired by [angular2-seed](https://github.com/mgechev/angular2-seed)_

# Features
* AngularJS **1.5.8**
* Angular Component Router
* Angular Material **1.1.0** ([doc](https://material.angularjs.org/latest/))
* SystemJS
* Livereload (install [Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to enable this feature)
* SCSS for styling ([doc](http://sass-lang.com/documentation/file.SASS_REFERENCE.html))

## Containers
* Electron ([website](http://electron.atom.io/)) with *livereload* for non-packaged apps

## Unit tests
* [jasmine](http://jasmine.github.io/2.4/introduction.html)
* [jasmine-matchers](https://github.com/JamieMason/Jasmine-Matchers) for handful extra matchers

### Recipes
You can find some useful recipes (eg. how to test $timeout and $interval) here:

```bash
 app
 |-- components
     |-- common
         |-- common.config.spec.ts               # angular values and constants
     |-- example
         |-- example-external.directive.html     # template for example-external.directive
         |-- example-external.directive.ts       # directive with external template (templateUrl needs the relative path from app/components)
         |-- example-external.directive.spec.ts  # test for a directive with external template
         |-- example-simple.directive.spec.ts    # test for a directive with inline-template
         |-- example.controller.spec.ts          # $interval and $timeout with jasmine spies
         |-- example.filter.spec.ts              # test for a custom filter
         |-- example.module.spec.ts              # injection and logs
         |-- example.provider.spec.ts            # test for a provider and its generated service with an example of module-level configuration
         |-- example.service.spec.ts             # angular services and Date
```

# How to start

## Git Setup

*NOTE*: This should be done first before you start making any changes and building out your project. Not doing so will likely result in dificulty when trying to merge in upstream changes later.

1. Download a zip of the seed. (**Do not fork**)
2. `npm run git.setup` - This will initialize `git` as well as setup `upstream` properly.
3. `git remote add origin ...your private repo...`
4. `npm run git.prepare` - This will prepare git to handle the merge
5. `npm run git.merge` - This will fetch upstream and run the first merge (*Important)
  * IMPORTANT: You will see a wall of Conflicts after doing above (a Conflict for every single file). This is normal. There actually will not be any problematic conflicts as it's just reporting every single file which both sides (`upstream` and your first commit) added.
6. `git add .; git commit -m'ready'`. **Yes**, you will be committing all those conflicts, which actually are not a problem in this 1 time case.
7. Now you have `git` setup and ready to develop your application as well as merge in upstream changes in the future.

### Merging latest upstream changes

1. `npm run git.merge.preview` - This will fetch `upstream` and show you how the merge would look
2. `npm run git.merge` - This will actually do the merge
3. Handle any conflicts to get latest upstream into your application.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/fr-esco/angularjs-ts-seed/issues).

## Installation

```bash
npm install
```

Node should automatically install:
* [typings](https://github.com/typings/typings) with TypeScript definitions
* [gulp-cli](https://github.com/gulpjs/gulp-cli) that should show the list of the
available tasks, with the description of the main ones

You can replicate these behaviours by running the following commands:

```bash
# If the tools have not been installed
npm install --save-dev typings gulp-cli

# If the TS definitions need to be updated
typings install

# If you need information about the main available tasks
gulp -T
```

## Main tasks

If you need support for using the afore mentioned tasks, you can run:

```bash
# shorthand
gulp <task> -s

# full version
gulp <task> --support
```

### Build, test and run

If you are ready to test and run the application:

```bash
# Unit test with PhantomJS or Chrome
gulp test [--debug] [--coverage]
# ... or
gulp test [-d] [-c]

# Dev run (default task)
gulp

# Dev run (default configuration)
gulp serve [--browser] [--electron]

# Dev mock REST server
gulp rest [--gui] [--refresh]

# Prod run
gulp serve --prod [--browser] [--electron]
# ... or
gulp serve -p [-b] [-e]
# ... or
gulp serve -p[b][e]
```

The command `gulp serve` starts a Node.js Express server.

Its option `--browser` starts a browser for the served web application. You can also open it by executing:

```bash
gulp open.browser
```

The other flag `--electron` open the served application in an Electron container. Similarly, you can launch:

```bash
gulp open.electron
```

Both browser page (via [Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)) and Electron app are reloaded on any source file change.

#### Package with Electron

You can package your application for any supported platform by executing:

```bash
gulp electron --name <appname> --platform <platform> [--environment <environment>]
# ... or
gulp electron -n <appname> -p <platform> [-e <environment>]

# Full support and further information
gulp electron -s
```

#### Package with Cordova

##### Init Cordova project

To initialize the Cordova project for Android, run the following:

```bash
npm i -g cordova
npm install

cd cordova && cordova platform add android
```

##### Using Cordova

You can package your application for any supported platform by executing:

```bash
# Build and run on plugged device
gulp cordova

# Just build the .apk
gulp cordova -t build

# Full support and further information
gulp cordova -s
```

## Scaffolding

The new component generator:

```bash
gulp gen:scaffold --name about
```

will create the following structure:

```bash
 app
 |-- components
     |-- about
         |-- about.scss                # styles
         |-- about.ts                  # entry point for imports / main definition (*)
         |-- about.component.html      # component template
         |-- about.component.ts        # component definition
         |-- about.component.spec.ts   # component unit test specs
         |-- about.filter.ts           # filter definition
         |-- about.filter.spec.ts      # filter unit test specs
         |-- about.module.ts           # module definition
         |-- about.module.spec.ts      # module unit test specs
         |-- about.service.ts          # service definition (**)
         |-- about.service.spec.ts     # service unit test specs

         components.ts            # *update manually* to register the module
```

(*) Remember to remove comments where necessary in `about.ts` for registration.

### Accelerator

You can generate a **scaffolded component** by using the following command:

```bash
gulp gen:scaffold --name <kebab-cased-component-name> [--folder <existingPathFromComponents>] [--directive] [--controller] [--provider]
```

You can generate a new angular *module* by using the following command:

```bash
gulp gen:module --name <kebab-cased-module-name> --path <existingPathFromComponents>
```

You can generate a new angular *controller* by using the following command:

```bash
gulp gen:controller --name <kebab-cased-controller-name> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *filter* by using the following command:

```bash
gulp gen:filter --name <kebab-cased-filter-name> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *REST service client* by using the following command:

```bash
gulp gen:service --name <kebab-cased-service-name> --path <existingPathFromComponents> [--module <moduleName>] --client
```

You can generate a new angular *service* by using the following command:

```bash
gulp gen:service --name <kebab-cased-service-name> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *provider* by using the following command:

```bash
gulp gen:provider --name <kebab-cased-provider-name> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *directive* by using the following command:

```bash
gulp gen:directive --name <kebab-cased-directive-name-without-prefix> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *component* by using the following command:

```bash
gulp gen:component --name <kebab-cased-component-name-without-prefix> --path <existingPathFromComponents> [--module <moduleName>]
```

## Styles

For styling components, every scaffold comes with a `.scss` file ready for use. Its first line is a *class-selector* that matches the component's name.

All these files are compiled and injected in an `index.css` file, included in the home page, by the gulp-task `build.styles.<env>`.

### Why SCSS?

The acronym **SCSS** stands for *Sassy CSS*, so both SASS and SCSS share the same specs, available [here](http://sass-lang.com/documentation/file.SASS_REFERENCE.html).

For starter, it is **fully CSS compliant**. It means, you can rename a CSS file in `.scss` and it will just work.
Making SCSS fully compatible with CSS has always been a priority for Sass maintainers since SCSS was released, and this is a big deal.
Moreover, they try to stick as close as possible to what could become a valid CSS syntax in the future (hence `@directives`).

Because SCSS is compatible with CSS, it means there is **little to no learning curve**. The syntax is already known: after all, it’s just CSS with a few extras.

Moreover, it is **easier to read** because it actually makes sense.
When you read `@mixin`, you know it is a mixin declaration; when you see `@include`, you are calling a mixin.
It doesn’t make any shortcuts, and everything makes sense when read out loud.

Also, almost all existing tools, plugins and demo for Sass are developed using the SCSS syntax.
As time goes, this syntax is becoming pro-eminent and the default (if only) choice, mostly for the above reasons.
For instance, it is getting quite hard to find a clean syntax highlighter for Sass indented syntax; usually, there is only SCSS available.

SCSS has been preferred to LESS for reasons very well explained in [this article](https://css-tricks.com/sass-vs-less/).

# Conventions

To enforce the adoption of best practices, every build begins with *lint* tasks.

In addition, you are encouraged to format your code `[Shift+Alt+F]` before any commit.

The use of **factories** is **deprecated**, because of the Object Oriented paradigm adopted.
