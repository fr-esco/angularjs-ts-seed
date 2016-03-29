# UE Platform 0.5 - Showcase project

## Introduction

A seed project for AngularJS apps written in *TypeScript*.

_This project is heavily inspired by [angular2-seed](https://github.com/mgechev/angular2-seed)_

# Features
* AngularJS **1.5.x**
* Angular Component Router
* Angular Material **1.1.0** ([doc](https://material.angularjs.org/latest/))
* SystemJS
* Livereload (install [Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to enable this feature)
* SCSS for styling ([doc](http://sass-lang.com/documentation/file.SASS_REFERENCE.html))

# Unit tests
* [jasmine](http://jasmine.github.io/2.4/introduction.html)
* [jasmine-matchers](https://github.com/JamieMason/Jasmine-Matchers) for handful extra matchers

## Recipes
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

```bash
git clone https://github.com/soulsoftware/angularjs-ts-seed
cd angularjs-ts-seed
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

### Accelerator

You can generate a **scaffolded component** by using the following command:

```bash
gulp gen:scaffold --name <snakeCasedComponentName> [--parent <existingPathFromComponents>]
```

You can generate a new angular *module* by using the following command:

```bash
gulp gen:module --name <snakeCasedModuleName> --path <existingPathFromComponents>
```

You can generate a new angular *controller* by using the following command:

```bash
gulp gen:controller --name <snakeCasedControllerName> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *filter* by using the following command:

```bash
gulp gen:filter --name <snakeCasedFilterName> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *service* by using the following command:

```bash
gulp gen:service --name <snakeCasedServiceName> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *provider* by using the following command:

```bash
gulp gen:provider --name <snakeCasedProviderName> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *directive* by using the following command:

```bash
gulp gen:directive --name <snakeCasedDirectiveNameWithoutPrefix> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *component* by using the following command:

```bash
gulp gen:component --name <snakeCasedDirectiveNameWithoutPrefix> --path <existingPathFromComponents> [--module <moduleName>]
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
gulp serve

# Prod run
gulp serve --prod
# ... or
gulp serve -p
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
         |-- about.controller.ts       # controller definition
         |-- about.controller.spec.ts  # controller unit test specs
         |-- about.directive.html      # directive template
         |-- about.directive.ts        # directive definition
         |-- about.directive.spec.ts   # directive unit test specs
         |-- about.filter.ts           # filter definition
         |-- about.filter.spec.ts      # filter unit test specs
         |-- about.module.ts           # module definition
         |-- about.module.spec.ts      # module unit test specs
         |-- about.provider.ts         # provider definition (**)
         |-- about.provider.spec.ts    # provider unit test specs
         |-- about.service.ts          # service definition (**)
         |-- about.service.spec.ts     # service unit test specs
         |-- about.tpl.html            # generic template

         components.ts            # *update manually* to register the module
```

(*) Remember to remove comments where necessary in `about.ts` for registration.

(**) Remember to choose between the provider and the service, because they export the same service (and unit tests will fail!).

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
