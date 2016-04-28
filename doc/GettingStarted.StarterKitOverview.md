# Overview
The **Platform** described derived from a Starter Kit that follow a specific structure.
The router adopted is Component Router, so each component can have an associated Router.
The main router is in the **app component** (```app.ts```).
All the components are grouped under the directory **components** and each of them is registered in ```components.ts``` file.


### app component

The main router is in the **app component** (```app.ts```) that contains the option ```$RouteConfig``` to map an URL path to a component:

```typescript
@at.component('app', ngMainComponentName, {
  templateUrl: 'app.html?v=<%= VERSION %>',
  $routeConfig: [
    { path: '/...', name: 'Main', component: 'tsfnMain' },
  ]
})
class App {
}
```

Above the path '/' is mapped with the **tsfnMain component**.
The '...' after the '/' means that the route named Main is a **non-terminal route**.

### main component

**main component** (```main/main.component.ts```) contains the option ```$RouteConfig``` where the Routes components (children of main) are added.

```typescript

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
The useAsDefault property on the Dashboard Route Definition, indicates that if no other Route Definition matches the URL, then this Route Definition should be used by default.

### components

In the ```components.ts``` file all the components are imported and injected into the app module.

```typescript

let app = angular.module('app', [
  'ngComponentRouter',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
   components.name,
])
```
