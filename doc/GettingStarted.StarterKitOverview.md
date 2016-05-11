# Table Of Contents
{TOC}

# Overview

The **Starter Kit** follows a specific structure inherited by **UE Platform**.

* All the sources are included in ```app``` directory.
>

* The StarterKit includes **navigation model** based on [Component Router](https://docs.angularjs.org/guide/component-router), so each component could have an associated Router and navigation capabilities. The **main router configuration** is defined in  **App component**  within ```app.ts``` while the **router configuration for child's components** is defined in **Main Component** within ```main/main.component.ts```.
>

* The **Module** is a particular component that aggregate other components, services, models, etc .. in order to implement a complete "Business Use Case". The module is considered as top-level-component and is arranged in a sub-directory of **components** folder. Each of them must be registered within ```components.ts``` file.
>

* The **Components** are grouped in **Modules** and must be registered within them. The UE platform is strongly based upon components and encourages their wide usage
>

## App Component

The principal roles of **App component** are:

1. Declare all **Application's Dependencies**
1. Set the  **Main Router Configuration**

### Declare all Application's Dependencies

In order to declare all Application Dependencies we have to declare a top-level-module named app and provide to it all dependencies modules.

```javascript
import {components} from './components/components';

let app = angular.module('app', [
  'ngComponentRouter',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
   components.name,
])
```

>**Note:**
>> ```components.name``` contains an array with all the dependencies' modules  added to application and declared in ```components.ts```



### Set the Main Router Configuration

Setting the  **main router configuration** allows navigation through application's view. Such configuration is implemented using the option ```$RouteConfig``` that map an URL path to a component. The **App Component** is declared in ```app.ts``` file.
Below a code snippet from ```app.ts``` file that show the main router configuration

```javascript
@at.component('app', ngMainComponentName, {
  templateUrl: 'app.html?v=<%= VERSION %>',
  $routeConfig: [
    { path: '/...', name: 'Main', component: 'tsfnMain' },
  ]
})
class App {
}
```

>**Note:**
>> Above the path '/' is mapped with the **tsfnMain component**.
>> The '...' after the '/' means that the route named Main is a **Non-Terminal-Route**.


## Main Component

**Main Component**  contains the option ```$RouteConfig``` where the Routes components (children) are added.
Below a code snippet from ```main/main.component.ts``` file that show the children router configuration

```javascript
@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'main/main.component.html',
 $routeConfig: [
    { path: '/dashboard', name: 'Dashboard', component: 'tsfnDashboard', data: { title: 'Dashboard' }, useAsDefault: true },
    { path: '/profile', name: 'Profile', component: 'tsfnProfile', data: { title: 'Profile' } },
    { path: '/table/...', name: 'Table', component: 'tsfnTable', data: { title: 'Table' } }

  ]
})
export default class MainComponent implements at.OnInit {
}

```

**Note:**
>The ```useAsDefault``` property on the Dashboard Route Definition, indicates that if no other Route Definition matches the URL, then >this Route Definition should be used by default.


## Modules

A Module a **top-level-component** that aggregates the other ones.

### Directory Tree Structure (DTS)

Below an example of **Directory Tree Structure** (DTS) that implements a Module

```bash
 app
 |-- components
     |-- <module>
         |-- <module>.scss                # styles
         |-- <module>.ts                  # entry point for imports / main definition (*)
         |-- <module>.component.html      # component template
         |-- <module>.component.ts        # component definition
         |-- <module>.component.spec.ts   # component unit test specs
         |-- <module>.filter.ts           # filter definition
         |-- <module>.filter.spec.ts      # filter unit test specs
         |-- <module>.module.ts           # module definition
         |-- <module>.module.spec.ts      # module unit test specs
         |-- <module>.service.ts          # service definition (**)
         |-- <module>.service.spec.ts     # service unit test specs

|-- |-- components.ts                     # modules registration
```

### Modules Registration

Below a code snippet from ```components.ts``` file that show the modules' registration

```javascript
import Common    from './common/common';
import Env       from './environment/config';
import Example   from './example/example';
import Exception from './exception/exception';
import Material  from './material/material';
import Main      from './main/main';
import Rest      from './rest/rest';

let components = angular.module('app.components', [
  Common,
  Env,
  Material,
  Main,
  Rest,
  Example
]);

export {components}
```

# Build, test and run

Several **gulp tasks** are provided in order to build test and run application.

## Run Unit test with PhantomJS or Chrome  

```bash

gulp test [--debug] [--coverage]  

gulp test [-d] [-c]

```
## Run application in development mode (default task)

```bash

gulp

gulp serve

```

## Dev mock REST server

```bash

gulp rest [--gui] [--refresh]

```

## Run application in production mode

```bash

gulp serve --prod
gulp serve -p

```
