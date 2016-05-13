Angular-hotkeys is a framework which allows us to add keyboard shortcuts to Angular apps.  
Particularly it allows:
* Define hotkeys on an entire route, automatically binding and unbinding them as you navigate
* Automatic listing of shortcuts when users hit the ? key

##Add hotkey

Steps To add a set of shortcuts to a route:  
1. Inject **hotkeys** in the realted component.   

example:  
```typescript
@at.inject('navigationService', '$log', '$q', '$mdSidenav', '$mdBottomSheet', '$mdMenu', '$mdToast', 'hotkeys', '$scope', '$rootRouter')
```
2. Bind the hotkey to the component  
example:    

```typescript
public $onInit() {
    var vm = this;
    this.hotkeys.add({
      combo: 'ctrl+z+x',
      description: 'Go to HotKeys',
      callback: function (eve, ht) {
        vm.rootRouter.navigate(['Main', 'HotKeys']);
       }
    });
  }
  ```
An object is passed to the function *add*.
It can contains the follow options:  

Option | Optional | Description 
--- | --- | ---
combo | NO | They keyboard combo (shortcut) you want to bind to 
description | YES | The description for what the combo does and is only used for the Cheat Sheet. If it is not supplied, it will not show up, and in effect, allows you to have unlisted hotkeys.
callback | NO | The function to execute when the key(s) are pressed. Passes along two arguments, event and hotkey
action |  YES | The type of event to listen for, such as keypress, keydown or keyup. Usage of this parameter is discouraged as the underlying library will pick the most suitable option automatically. This should only be necessary in advanced situations.
allowIn |  YES | an array of tag names to allow this combo in ('INPUT', 'SELECT', and/or 'TEXTAREA')

Hotkeys bound using the *hotkeys.add()* method is persistent, meaning they will continue to exist through route changes.      
To remove it when the route is destroyed, the hotkey can be bound to the scope by the *bindTo* function.   
example: 
  

```typescript
 this.hotkeys.bindTo(this.scope)
      .add({
        combo: 'ctrl+v',
        description: 'Confirm',
        callback: function (event, ht) {
          vm.addNewProduct();
        })
```

##Remove hotkey
It is also possible remove the hotkey by *hotkeys.del(key)*   
example:

```typescript
this.hotkeys.del('ctrl+v');
```
##Prevent the default action 
An hotKey could be associated to an action in the browser yet.     
**preventDefault()* function prevent the execution of this action.  
example: 

```typescript
 this.hotkeys.bindTo(this.scope)
      .add({
        combo: 'ctrl+v',
        description: 'Confirm',
        callback: function (event, ht) {
          event.preventDefault();
          vm.addNewProduct();
        }
      })
```
##Allowing hotkeys in form elements
 When the event originates from an input, select, or textarea element the hotkey callback is not executed.  
**allowIn** option allows the hotkey callback execution.   
example:   

```typescript
.add({
        combo: 'ctrl+v',
        description: 'Confirm',
        allowIn: ['INPUT'],
        callback: function (event, ht) {
          event.preventDefault();
          vm.addNewProduct();
        })
        ```
##Customize Cheatsheet 
By default clicking **?** a cheatsheet, which shows all the hotkeys defined, is shown.    
It has a default template, but you can customize it.  
example in **init.ts** file:      
```typescript

 angular.module('app').config(['hotkeysProvider', function (cfphotkeys) {
       cfphotkeys.template = '' +
        ' <div class="hotkeys-div fade" ng-class="{in: helpVisible}" style="display: none;">' +
          '<div class="cfp-hotkeys">' +
          '<fieldset><legend>{{ title }}</legend>' +
          '<div class="hotkeys-close" ng-click="toggleCheatSheet()">&#215;</div>' +
          '<table><tbody>' +
          '<tr ng-repeat="hotkey in hotkeys | filter:{ description: \'!$$undefined$$\' }">' +
          '<td class="cfp-hotkeys-keys">' +
          '<span ng-repeat="key in hotkey.format() track by $index" class="cfp-hotkeys-key">{{ key }}</span>' +
          '</td>' +
          '<td class="cfp-hotkeys-text">{{ hotkey.description }}</td>' +
          '</tr>' +
          '</tbody></table>' +
          '</fieldset></div></div>';
      }]);
      ```
```css
.hotkeys-div {
  display: table !important;
  position: fixed;
  top: 0;
  left: 0;
  color: #333;
  font-size: 1em;
  background-color: rgba(255,255,255,0.9);
}

.hotkeys-div.fade {
  z-index: -1024;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.15s linear;
  -moz-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}
.hotkeys-div.fade.in {
  z-index: 10002;
  visibility: visible;
  opacity: 1;
}
.hotkeys-close:hover {
  background-color: #fff;
  cursor: pointer;
}  
 ```     