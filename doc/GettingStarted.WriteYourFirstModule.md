# 1. Write Your First Module
This document explains all the main steps to add a new component.
## 1.1 Steps List
## Add a new component
In this section are listed all the steps needed to add a new component and attach it to the Main component.

### First Step
The first step generates a component with all the elements needed.

It is possible to do this in two different ways:

#### a. Using an Accelerator that allows to create a **scaffolded component** by the follow command 

```bash
gulp gen:scaffold --name <snakeCasedComponentName> [--parent <existingPathFromComponents>]
```
example:
```bash
gulp gen:scaffold --name example
```

The result of this command is a directory ```example``` with the scaffold of an angular module and all the core elements of a module (component, filter, service).
 ```bash
        app  
        |--components  
          |--example   
            |-- example.scss                # styles   
            |-- example.ts                  # entry point for imports / main definition   
            |-- example.component.html      # component template   
            |-- example.component.ts        # component definition  
            |-- example.component.spec.ts   # component unit test specs   
            |-- example.filter.ts           # filter definition   
            |-- example.filter.spec.ts      # filter unit test specs   
            |-- example.module.ts           # module definition  
            |-- example.module.spec.ts      # module unit test specs  
            |-- example.service.ts          # service definition   
            |-- example.service.spec.ts     # service unit test specs  

```
#### b. Using the commands listed in the Accelerator section;  
You can generate the element that you need individually as shown in ```document``` .

### Second Step

In the second step you attach the component to app module.
You need to import the module in the file components.ts 
i.e.:
```typescript
import Example from './example/example';
```

and then inject Example into the **app.component** module.
i.e.:
```typescript

let components = angular.module('app.components', [
  Common,
  Material,
  Main,
  Example
]);

```
## Add Menu Item to access your component (aka Routing)
### Third Step

In the third step you have to add the new component to the main menu (```main-left-sidenav.directive.html```). 
In ```common/navigation.service.ts``` the array **menuItem** contains all the items that are loaded in the menu.
example:
```typescript

 private menuItems: Array<IMenuItem> = [ 
   {
      name: 'Example',
      icon: 'example',
      link: ['Example']
     }
  ];
```
* *name*:  Name shown as button label that is associated to the component into the menu;     
* *icon*:  an icon associated to the component (it can be an angular material icon);   
* *link*:  Link Parameters Array that contains the name associated to the route,    
  It is used with ng-link in order to binding a clickable HTML element to a route.

### Fourth Step

In the last step you have to map the path '/example' with the component created on previous step.
To do this you have to add a new RouteDefinition to the option $routeConfig of the tsngMain component.
example:
```typescript
 $routeConfig: [
    { path: '/dashboard', name: 'Dashboard', component: 'tsngDashboard', data: { title: 'Dashboard' }, useAsDefault: true },
    { path: '/profile', name: 'Profile', component: 'tsngProfile', data: { title: 'Profile' } },
    { path: '/table/...', name: 'Table', component: 'tsngTable', data: { title: 'Table' } }, 
    [ path: '/example', name: 'Example', component: 'tsngExample'}
  ]
```
Above the path '/dashboard' is mapped with the **tsngDashboard component**.  
The '...' after the '/table/' means that the route named Table is a **non-terminal route**. 

# 4. Build, test and run
 Several gulp task are provided in order to run and executes unit test.
 
* Unit test with PhantomJS or Chrome  
```bash 
gulp test [--debug] [--coverage]  
        or  
gulp test [-d] [-c]
```
* Dev run (default task)
```bash 
gulp
```
* Dev run (default configuration)
```bash 
gulp serve
```
* Dev mock REST server
```bash 
gulp rest [--gui] [--refresh]
```
* Prod run
```bash 
gulp serve --prod
      or
gulp serve -p
```

## Accelerator
Some Accelerator are provided in order to help and to make easy the generation of all core elements of a module.  


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