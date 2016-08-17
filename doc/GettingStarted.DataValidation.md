#Data Validation
It is possible perform some validations on some data in input.   
For Example it is possible validate a form and all the fields in input in several ways.    
To apply custom validation to a form, a **novalidate* attribute is needed in order to disable browser's native form validation.  
i.e:
```html
 <form novalidate name="formname">
```

Angular provides basic implementation for most common HTML5 input types: 
(text, number, url, email, date, radio, checkbox), as well as some directives for validation: 
* required: used for mandatory field.  
example:
```html
<input type="text" ng-model="$ctrl.user.name" name="uName" required />
```
* pattern: used to validate a field by a Regular Expression.    
example:  
In the example below the regular expression requires a specific top-level domain **example.com**
```html
<input name="email" ng-model="$ctrl.user.email" type="email" ng-pattern="/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i">
```

* minlength/maxlength: they allow to specify the minimum or the maximum length of the imput value.  
 example:   
The username value must have a length between 8 and 15. 
```html
 <input name="username" ng-model="$ctrl.user.username" ng-minlength="8" ng-manlength="15">
```
* min/max: applyed to field, it allow to specify a minum or a maximum value that can be entered.  
example:  
The age must be between 18 and 99.
```html
 <input type="number" name="input" ng-model="$ctrl.user.age" min="18" max="99">
```  

#How show validation errors  
Failed validators are stored by key in the property $error.  
$error is an object which stores a key/value state of validation errors:
* keys: are validation tokens (error names),
* values: are arrays of controls that have a failing validator for given error name.  
There are some Built-in validation tokens related to the angular directives described above.  
example:
```html
<input name="email" ng-model="$ctrl.user.email" type="email" ng-pattern="/^[a-zA-Z0-9._%+-]+@flatlogic.com$/" required>
      <div ng-messages="userForm.email.$error" ng-show="userForm.email.$dirty">
        <div ng-message="required">Email required!</div>
        <div ng-message="pattern">Bad domain</div>
      </div>
```
In the example above the directive ng-messages is adopted to show the error.   
It show or hide the corresponding message based on the state of the provided key/value object ($error).  
The field **email** has a chain of validation:  
the first one ckeck if the field email has been filled;   
the second one check the correct email format based on Regular Expression.  
If an error occurs, the related error is shown in the specified order.    
It is also possible show multiple messages at the same time using the attribute **multiple**.  
example:
```html
<input ng-model-options="{ updateOn: 'blur' }" placeholder="e.g. IT" name="state" id="state" ng-model="$ctrl.user.state"
          ng-pattern="/^[A-Za-z]*$/" ng-minlength="2" mimaxlength="2">
        <div ng-messages="userForm.state.$error" multiple ng-show="userForm.state.$dirty">
          <div ng-message="pattern">Only character allowed</div>
          <div ng-message="minlength">That's too short!</div>
        </div>
```
*Make sure to include ngMessages module when using ng-message markup (It could be imported in material module (```material.module.ts```) yet)
#Custom Validation
With a custom directive, you can add your own validation functions.
###Steps List      
1. Generate a directive
2. Add ```require``` option setted to 'ngModel'
3. Add ```link``` option
```typescript
link: function(scope, elm, attrs, ctrl)
```
4. add a new validator in ```$validators``` by the follow instruction:
```typescript
 ctrl['$validators'].NewValidatorKey = function(modelValue, viewValue){
     ...
 }
 ```
 * Add a new validator identified by the key ```NewValidatorKey```. 
 * The function contains the validation operation. 
 example:
 
```javascript
import ngModuleName from './profile.module';
'use strict';

const ngDirectiveName = 'dateInThePastValidation';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  link: function(scope, elm, attrs, ctrl) {

    ctrl['$validators'].validate = function(modelValue, viewValue) {
      var today = new Date();
      if (ctrl['$isEmpty'](modelValue) || modelValue > today) {
        return false;
      }
      return true;
    };
  }
})
@at.inject('$log')
export default class ExamplesCustomValidation {
  constructor(private log: angular.ILogService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
```
In the example above a new validator, identified by the key ```validate```, is created.   
It check if the date entered by the user is in the past.   
You can apply the custom validator to the field calling the directive on the element **input** as an attribute 
and show the error evaluating the result of the validator stored in ```$error```.
```html
<input name="submissiondate" id="submission-date" type="date" date-in-the-past-validation ng-model="$ctrl.user.submissionDate">
   <div ng-messages="userForm.submissiondate.$error" ng-show="userForm.submissiondate.$dirty">
     <div ng-message="validate">Invalid Date</div>
   </div>
```    

In the same way it is also possible create asynchronous (i.e. remote request) validation using ```$asyncValidators``` object.  
example:
```typescript
import ngModuleName from './profile.module';
import AddclientComponent from './profile.component';

'use strict';

const ngDirectiveName = 'usernameAsynchroValidation';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  scope: {},
  link: (scope, elm, attrs, ctrl) => {
    elm.on('blur', () => {
      var usernames = ['JohnJohn_88', 'Peter_77', 'usernameEx'];

      if (ctrl['$isEmpty'](ctrl['$modelValue'])) {
        // consider empty model valid
        return scope['vm'].q.when();
      }

      var def = scope['vm'].q.defer();
      scope['vm'].timeout(() => {
        // Mock a delayed response
        if (usernames.indexOf(ctrl['$modelValue']) === -1) {
          def.resolve(ctrl['$setValidity']('asynchroValidator', true));
        } else
          def.reject(def.resolve(ctrl['$setValidity']('asynchroValidator', false)));
      }, 2000);

    });
  }
})

@at.inject('$q', '$timeout')
export default class Asynchrovalidation {
  constructor(protected q: angular.IQService, protected timeout: angular.ITimeoutService) {
  }
}
```
The example above mocks the server request with a $q deferred and check if the username entered by user already exists.   

```html
<input name="title" id="title" username-asynchro-validation ng-model="$ctrl.user.title" ng-minlength="8" required>
    <div ng-messages="userForm.title.$error" ng-show="userForm.title.$dirty">
        <div ng-message="minlength">That's too short!</div>
        <div ng-message="required">Username required!</div>
        <div ng-message="asynchroValidator">Username already exists!</div>
     </div>
```
By default, any change to the content will trigger a model update and form validation.
For this reason all the validation are performed when the field change, 
instead the above asyncronous validation is executed when the field loses focus because a function with validation operation is attach to the event ```'blur'``` on the element ```elm``` by the follow instruction:
```typescript
 elm.on('blur', () =>{
     ...
 }
 ```
 You can change the default behaviour using the ngModelOptions directive to specify a list of events.   
 I.e. ng-model-options="{ updateOn: 'blur' }". It is applyed to all the validators.  
 example:
 ```html
 <input type="text" ng-model="user.name" ng-model-options="{ updateOn: 'blur' }" />
 ```