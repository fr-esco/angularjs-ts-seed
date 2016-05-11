# Table Of Contents
{TOC}

# Data Validation

It is possible perform some validations on some data in input phase. It is possible validate a form and all its fields in several ways.

## Disable default form validation

To apply custom validation to a form, a **novalidate** attribute is needed in order to disable browser's native form validation.

```html

<form novalidate name="formname">
</form>   

```

## Mandatory field

UE Platform (using Angular feature) provides basic implementation for most common HTML5 input types like:
text, number, url, email, date, radio, checkbox, ... as well as some directives for validation: ```required``` used for mandatory field.


**Example:**

```html

<input type="text" ng-model="$ctrl.user.name" name="uName" required />

```
## Validate using a Regular Expression

It is possible specify a pattern to validate a field by a Regular Expression.


**Example:**
> The regular expression requires a specific top-level domain **example.com**

```html

<input name="email" ng-model="$ctrl.user.email" type="email" ng-pattern="/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i">

```
## Validate the field's length

It is possible to specify both minlength and maxlength in order to validate the minimum or the maximum length of the input value.

**Example:**
> The username value must have a length between 8 and 15.

```html

 <input name="username" ng-model="$ctrl.user.username" ng-minlength="8" ng-manlength="15">

```

## Validate the value's boundary

It is possible specify both min and max to field allowing to specify a minimum or a maximum value that can be entered.

**Example:**
> The age must be between 18 and 99.

```html

<input type="number" name="input" ng-model="$ctrl.user.age" min="18" max="99">

```  

# Show validation errors

Each **failed validators** are stored in a field's property named ```$error```. ```$error``` Is an object hash, containing references to controls or forms with failing validators, where:

* **keys** are validation tokens (ie. error names),
* **values** are arrays of controls that have a failing validator for given error name.  

Below the available **Built-in validation tokens**

> ```
email
max
maxlength
min
minlength
number
pattern
required
url
date
datetimelocal
time
week
month
```

**Example:**
> In the example below the directive ```ng-messages``` is adopted to show the error. It show or hide the corresponding message based on the state of the provided key/value object ($error). The field **email** has a chain of validation:
>
>1. Ckeck if the field email has been filled;
>1. Check the correct email format based on Regular Expression.

> If an error occurs, the related error is shown in the specified order.

```html

<input name="email" ng-model="$ctrl.user.email" type="email" ng-pattern="/^[a-zA-Z0-9._%+-]+@flatlogic.com$/" required>
<div ng-messages="userForm.email.$error" ng-show="userForm.email.$dirty">
  <div ng-message="required">Email required!</div>
  <div ng-message="pattern">Bad domain</div>
</div>

```

**Example:**
> This example show the possibility to present multiple messages at the same time using the attribute **multiple**.  

```html

<input  ng-model-options="{ updateOn: 'blur' }"
        placeholder="e.g. IT"
        name="state" id="state"
        ng-model="$ctrl.user.state"
        ng-pattern="/^[A-Za-z]*$/"
        ng-minlength="2"
        mimaxlength="2">

<div ng-messages="userForm.state.$error" multiple ng-show="userForm.state.$dirty">
  <div ng-message="pattern">Only character allowed</div>
  <div ng-message="minlength">That's too short!</div>
</div>

```

**Note**:
> Make sure to **include ngMessages module** when using ```ng-message``` markup.

## Custom Validation

Using a **custom directive**, you can add your own validation functions.
In order to implement a custom validation we need to follow the steps outlined below:

1. Generate a directive
1. Add ```require``` option and set it to ```ngModel```
1. Add ```link``` option

    ```javascript

     link: function(scope, elm, attrs, ctrl)

    ```
1. Add a new validator in ```$validators``` by the follow instruction:

 * Add a new validator identified by the key ```NewValidatorKey```.
 * The function contains the validation operation.

    ```javascript

     ctrl['$validators'].NewValidatorKey = function(modelValue, viewValue) {
     }

    ```

### Example
> Create a new validator, identified by the key ```validate```. It checks if the date entered by the user is in the past. You can apply the custom validator to the field calling the directive on the element **input** as an attribute and show the error evaluating the result of the validator stored in ```$error```.

#### Javascript

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

#### HTML Template

```html

<input name="submissiondate" id="submission-date" type="date" date-in-the-past-validation ng-model="$ctrl.user.submissionDate">
<div ng-messages="userForm.submissiondate.$error" ng-show="userForm.submissiondate.$dirty">
  <div ng-message="validate">Invalid Date</div>
</div>

```    

## Async Validator
> It is also possible create asynchronous (i.e. remote request) validation using ```$asyncValidators``` object as shown the example below.  

### Example
> In the following example the server request has mocked with a $q deferred and check if the username entered by user already exists.   
#### Javascript

```javascript

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
export default class AsynchroValidation {
  constructor(protected q: angular.IQService, protected timeout: angular.ITimeoutService) {
  }
}

```

#### HTML Template


```html

<input name="title" id="title" username-asynchro-validation ng-model="$ctrl.user.title" ng-minlength="8" required>
<div ng-messages="userForm.title.$error" ng-show="userForm.title.$dirty">
  <div ng-message="minlength">That's too short!</div>
  <div ng-message="required">Username required!</div>
  <div ng-message="asynchroValidator">Username already exists!</div>
</div>


```

# Update Model Options

By default, any change to the content will trigger a model update and form validation. For this reason all the validation are performed when the field change (ie. on lost focus ).
In the case we want change update model behaviour we can change the default behaviour using the ngModelOptions directive to specify a list of events.

```html

<input type="text" ng-model="user.name" ng-model-options="{ updateOn: 'blur' }" />

```
