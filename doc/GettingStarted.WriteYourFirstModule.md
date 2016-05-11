# Table Of Contents
{TOC}

# Write Your First Module (Top Level Component)
This document concerns how to add a new **Module** to the application. The **Module** is a particular component that aggregate other components, services, models, etc .. in order to implement a complete "Business Use Case".

In the section below are outlined the steps required to add a new **Module** and attach it to the **Main Component**.

## Generate a Module (scaffold)
The first step is to generates all the assets that implements a single Module.

It is possible to do this in two different ways:

### a.) Use the "gen:scaffold" task for create a Module template
> Refer to [Module Scaffolding Task][Accelerators]

### b.) Use the "gen:module" task for create an empty Module

```bash

# create module directory
mkdir app/components/<module directory name>

gulp gen:module --name <kebab-cased-module-name> --path <module directory name>

```

For example, if we would create a new Module named **example** into the directory **exampleModule** we have to run the following task

```bash

# create module directory
mkdir app/components/example-module

gulp gen:module --name example --path example-module

```

Such task will generate  the following directory tree structure:

```bash

  app  
  |--components  
    |--example-module   
      |-- example.scss                # styles   
      |-- example.ts                  # entry point for imports / main definition   
      |-- example.module.ts           # module definition  
      |-- example.module.spec.ts      # module unit test specs  

```


## Register module within application

After we have generated module **we have to register it**. So we have to attach the Module to the Application component. To do this you need to import the module in the file **components.ts**

```javascript

import Example from './example-module/example';

```

and then inject it into the **app.component** module.

```javascript

//
// app.components module's dependencies
//
let components = angular.module('app.components', [
  Common,
  Material,
  Main,
  Example // module has declared as dependency
]);

```

## Add Menu Item to access your Module (aka Routing)

In order to make reachable your module, you have to add it to the main menu (```main-left-sidenav.directive.html```).
Take a look at the array ```menuItem``` in ```common/navigation.service.ts``` that contains all the items that are loaded in the menu itself.

### Example

```javascript

/**
Main Menu Items
**/
private menuItems: Array<IMenuItem> = [
  {
    name: 'Example',
    icon: 'example',
    link: ['Example']}
];

```

**Where:**

--- | ---
| *name* |  Name shown as button label that is associated to the component into the menu;     
| *icon* | an icon associated to the component (it can be an angular material icon);   
| *link* | Link Parameters Array that contains the name associated to the route, it is used with ng-link in order to binding a clickable HTML element to a route.

### Map routing path

Finally you have to map the path ```/example``` with the component created on previous step.
To do this you have to add a new RouteDefinition to the option ```$routeConfig``` of the **tsfnMain component**.

**Example:**

```javascript

 $routeConfig: [
    { path: '/dashboard', name: 'Dashboard', component: 'tsfnDashboard', data: { title: 'Dashboard' }, useAsDefault: true },
    { path: '/profile', name: 'Profile', component: 'tsfnProfile', data: { title: 'Profile' } },
    { path: '/table/...', name: 'Table', component: 'tsfnTable', data: { title: 'Table' } },
    [ path: '/example', name: 'Example', component: 'tsfnExample'}
  ]

```

Above the path ```/dashboard``` is mapped with the **tsfnDashboard component**. The '...' after the '/table/' means that the route named Table is a **non-terminal route**.

# Build, test and run

Several **gulp tasks** are provided in order to build test and run application.

## Run Unit test with PhantomJS or Chrome  

```bash

gulp test [--debug] [--coverage]  

```
## run application in development mode (default task)

```bash

gulp serve

```

## Run application in production mode

```bash

gulp serve --prod

```

# References

* [Platform Accelerators][Accelerators]
* [Factory Tools][Factory Tools]
