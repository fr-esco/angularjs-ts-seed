1. Create new directory under ```/app/components``` (ex: **newExample**)
2. Generate new module with the follow command:
```bash
gulp gen:module --name <snakeCasedModuleName> --path <existingPathFromComponents>
```
 **example:**
 ```bash
 gulp gen:module --name newexample --path newExample
 ```
3. Register the new module in ```components.ts```   
* You need to import the module in the file components.ts 
 **example:**
```typescript
import NewExample from './newExample/newexample';
```
* and then inject Example into the **app.component** module.
 **example:**
```typescript
let components = angular.module('app.components', [
  Common,
  Material,
  Main,
  NewExample
]);
```
4. Generate new component with the follow command:
 ```bash
gulp gen:component --name <snakeCasedDirectiveNameWithoutPrefix> --path <existingPathFromComponents> [--module <moduleName>]
```
 **example:**
 ```bash
gulp gen:component --name newexample --path newExample
```
5. Register the new component into the ```newexample.ts``` file by the follow import instruction:
 ```typescript
import './newexample.component';
```
*You can follow the step 4-5 for each element using the specific accelerator*
