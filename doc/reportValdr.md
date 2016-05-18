Some approaches and framework were examined in order to support the configurability and the reuse of form validation logic cross layers.
The main goal is to extract the validation rules from some constraints specified in the Java model classes (back-end layer) and reuse it in the front-end layer by a configuration file.
This configuration may be generated from Bean Validation constraints and then used in a front-end layer in order to apply the constrains to the related form.   
In particular some framework front-end side were examined.   
The most relevant are:
1. Angular-Formly *http://angular-formly.com/#/ *, 
2. valdr *https://github.com/netceteragroup/valdr *

These framework support the validation rules definition from a JSON file.
1. Angular-Formly is an AngularJS module which has a directive to help customize and render JavaScript/JSON configured forms.
It require the use of formly-form directive in HTML and 
an array of fields must be passed to the formly-form directive.
```The configuration of fields array is delegated to the controller.```  
The html become:

```html
<form name="vm.someForm" ng-submit="vm.handleSubmit()">
  <formly-form model="vm.model" fields="vm.fields" options="vm.options">
    <button type="submit" ng-disabled="vm.someForm.$invalid">Submit</button>
    <button type="button" ng-click="vm.options.resetModel()">Reset</button>
  </formly-form>
</form>
```
*Fields* array.  
Each field can be configured with several options as descrbed into this document http://docs.angular-formly.com/docs/field-configuration-object  
A simple example is:
```typescript
fields = [
  {
    
    key: 'username',
    type: 'input'
  },
  {
    key: 'name.first',
    type: 'input'
  },
  {
    key: 'name.last',
    type: 'input'
  }
];
```
 Angular-formly also provide some prebuilt templates to customize the fields. One of this is FormlyMaterial. 
 Forms can be configured in a JSON object but 
 ```it could be harder define a specific layout```.  
 To add validation rules to a field you can provide an object where the keys are the name of the validator and the 
 values are Formly Expressions (string or a function)(serializable to JSON => example: http://angular-formly.com/#/example/other/json-powered).
 
 example:  
 ```javascript 
 fields = [
    {
    type: 'input',
    key: 'bar',
    templateOptions: {required: true, label: 'IP Address'},
    
    validators: {
      ipAddress: {
        expression: function($viewValue, $modelValue, scope) {
          var value = $modelValue || $viewValue;
          return /(\d{1,3}\.){3}\d{1,3}/.test(value);
        },
        message: '$viewValue + " is not a valid IP Address"'
      }
    },
    validation: {
      messages: {
        required: 'to.label + " is required"'
      }
    }
 ]
 ```
It also have a *validation* option that can be useful if used in combination with ng-messages. 
2. valdr  
Valdr is a framework which allow to extract the validation constraints from a JSON structure and apply them to the related fields.
In a JSON structure is enough define the constraints per field and valdr automatically validates the form fields.
Given the follow  rules validation configuration in a json structure:  

```json
{
  "Person" : {
    "firstName" : {
      "size" : {
        "min" : 5,
        "message" : "{message.size}",
        "max" : 10
      },
      "required" : {
        "message" : "required"
      }
    },
     "lastname" : {
      "size" : {
        "min" : 4,
        "message" : "{message.size}",
        "max" : 31
      }
    }
  }
}
```
To apply it to a form, valdr-type directive is applied on form tag to bind it to the related json object 
(valdr-type directive can be added to a form on any parent element of the input fields to validate).
*valdr-form-group* can wrap multiple valdr validated form items.   
Each form item has to have at least one surrounding valdr-form-group to automatically show validation messages.   
In HTML a simple form is defined as follow:
```html
<form name="userForm" novalidate valdr-type="Person">
  <md-input-container flex valdr-form-group>
    <label for="firstName">First Name</label>
    <input name="firstName" id="firstName" ng-model="$ctrl.user.firstName">
   </md-input-container>
    <md-input-container flex valdr-form-group>
        <label for="last-name">Last Name</label>
        <input name="lastname" id="lastname" ng-model="$ctrl.user.lastName">
    </md-input-container>
 </form>
 ```
``` In this way is easier define a form layaout as needed and apply it the validations. In addition no attributes and tags are needed, this increases the readability of the form```    
 
 It is possible add constraints from JSON reading a local json file or load the validation constraints from back-end.
 The *valdrProvider* provides two function to load constraints which are used in a module block config. 
 
 *  ** valdrProvider.addConstraints(JSON-object)**   
 example to add to *init.ts*:  
 A *constraints.json* file is red and the related JSON-object is passed to *addConstraints* .
 
 ```typescript
  angular.element(document)
    .ready(() => {
      $.get('./components/profilevaldrexample/constraints.json', function (configData) {

        angular.module('app').config(['valdrProvider', function (valdrProvider) {
          valdrProvider.addConstraints(configData);
        }]);

        angular.bootstrap(document.body, ['app']);
      });
    });
})
```
 
* ** valdrProvider.setConstraintUrl(url)**    
example in *profilevaldr.config.ts*:   
 ```typescript
valdrProvider.setConstraintUrl('http://localhost:8080/valdr-bean-validation-demo/validationRules';
or
valdrProvider.setConstraintUrl('./components/profilevaldrexample/constraints.json';

```
example of  **config.ts** file:

```typescript
class ProfileModuleConfiguration {
  @at.injectMethod('valdrProvider', 'valdrMessageProvider', '$translateProvider')
  public static valdrConf(valdrProv, valdrMsgProv, translateProv) {
    valdrProv.setConstraintUrl('http://localhost:8080/valdr-bean-validation-demo/validationRules';

    translateProv.translations('en', {
      'message.size': '{{fieldName}} must be between {{min}} and {{max}} characters.',
      'Person.lastname': 'Last name'
    });

    translateProv.translations('it', {
      'message.size': '{{fieldName}} deve essere compreso tra {{min}} e {{max}}.',
      'Person.lastname': 'Last name'
    });


  };
}
export default ProfileModuleConfiguration.valdrConf;
```
The configuration above loads the constraints from the specified url.   
example of **valdrConf** used in *profilevaldr.module.ts*
 
 ```typescript
 import valdrConf from './config'
 export default angular.module(ngModuleName, ['ngComponentRouter', 'valdr', Material, Showcase])
 .config(valdrConf)
```
The validation rules above are generated by Valdr-bean-Validation explains later.   
###Custom Valdation
Valdr allow you to add also custom validation but *it doesn't support asyncronous validaton*.  
Steps to add custom validation:  
* In a config block add the follow  instruction:
 
 ```typescript
 valdrProvider.addValidator('customValidator');
```

* define a custom validation as a provider:

 ```typescript
const ngServiceName = 'customValidator';
@at.provider(ngModuleName, ngServiceName)
export default class CustomValidator implements angular.IServiceProvider {
  public name = '';

  constructor() {
    this.name = 'customVal';

  }
  public validate(value, constraint) {

    console.log('value: ' + value);
    if (value === constraint.onlyValidValue) {
      return true;
    }
    return false;
  };

  public $get() {
    return new CustomValidator();
  }
}
```
* use it in a json configuration as follow:  
example:

```json
'Person': {
      'firstName': {
        'customVal': {
          'onlyValidValue': 'Tom',
          'message': 'First name has to be Tom!'
        }
      }
    }
```
Valdr also integrates angular-translate as shown above in **valdrConf**.
####Show the error messages:
It is possible show the error messages with valdr-messages module.  
It could be useful set a css to customize the error messages.   
Example:   
```css
.valdr-message {
    display: none;
}

    .valdr-message.ng-invalid.ng-touched, .ng-submitted .valdr-message.ng-invalid {
        display: block;
        color: #a94442;
        font-size: 12px;
    }
```
 ###Back-end layer validation rule generation

The main goal is generate a set of validation rules from  Bean Validation (aka JSR 303 annotations) annotations specified in Java model classes.
This set of rules should be structured follow the JSON rules in order to allow the reuse of the constraints defined in the model.   
Valdr-Bean-Validation is a framework that scans the Java classes specified and generates the rules validation.   
It can be used:    
**offline**: CLI client which can be integrated into build process to produce static valdr JSON which is packaged and delivered with the web application;   
**online**: Servlet which parses model classes at runtime and sends JSON back to AngularJS client (e.g. during client start or on-demand).    
Steps:
* add dependency in pom Maven  
```xml
<dependency>
  <groupId>com.github.valdr</groupId>
  <artifactId>valdr-bean-validation</artifactId>
  <version>1.1.2</version>
</dependency>
```
* configure web.xml.    
Example:   
```xml
<servlet>
  <servlet-name>valdr Bean Validation Servlet</servlet-name>
  <servlet-class>com.github.valdr.ValidationRulesServlet</servlet-class>
  <!-- if omitted valdr-bean-validation.json is expected at the root of the class path -->
  <init-param>
    <param-name>configFile</param-name>
    <param-value>my-config.json</param-value>
  </init-param>
</servlet>
```
* It needs also a configuration file to define the package to scan, the output file and other options.
example of valdr-bean-valdaton-demo configuration file (https://github.com/netceteragroup/valdr-bean-validation/tree/master/valdr-bean-validation-demo):
```
{
  "modelPackages": ["com.github.valdr.demo.model"],
  "excludedClasses": ["com.github.valdr.demo.model.IgnoredClass"],
  "excludedFields": ["com.github.valdr.demo.model.Person#ignoredField"],
  "corsAllowOriginPattern": "*",
  "outputFullTypeName": false,
  "outputFile": "${project.build.directory}/${project.build.finalName}/constraints.json"
}
```   
Given the follow class model *Person*:
 ```java
public class Person {
  @NotNull(message = "\\foo")
  @Size(min=5, max=10, message="size.message")
  private String firstName;
  @Size(min = 4, max = 31, message="size.message")
  private String lastName;
  @Min(value=18, message="min age 18")
  private int age;
  @URL(message = "URL.message")
  private String url;
  @Pattern(regexp = "abc", message="Pattern.message")
  private String addSlashPrefixSuffix;
  @Pattern(regexp = "\\abc\\.", message="Pattern.message") // \a matches the bell character ;-)
  private String withBackslashes;
  @Pattern(regexp = "\\\\abc\\.", message="Pattern.message")
  private String withMoreBackslashes;
  @NotNull
  private String ignoredField;
}
```
The related Json generated is:
```json
{
  "Person" : {
    "firstName" : {
      "size" : {
        "min" : 5,
        "message" : "{Size.message}",
        "max" : 10
      },
      "required" : {
        "message" : "\\foo"
      }
    },
    "lastName" : {
      "size" : {
        "min" : 4,
        "message" : "{Size.message}",
        "max" : 31
      }
    },
    "addSlashPrefixSuffix" : {
      "pattern" : {
        "flags" : [ ],
        "message" : "{Pattern.message}",
        "value" : "/abc/"
      }
    },
    "withMoreBackslashes" : {
      "pattern" : {
        "flags" : [ ],
        "message" : "{Pattern.message}",
        "value" : "/\\\\abc\\./"
      }
    },
    "withBackslashes" : {
      "pattern" : {
        "flags" : [ ],
        "message" : "{Pattern.message}",
        "value" : "/\\abc\\./"
      }
    },
    "age" : {
      "min" : {
        "message" : "min age 18",
        "value" : 18
      }
    },
    "url" : {
      "hibernateUrl" : {
        "regexp" : ".*",
        "protocol" : "",
        "port" : -1,
        "flags" : [ ],
        "host" : "",
        "message" : "{URL.message}"
      }
    }
  }
}
```
Valdr-bean-validation is a plugin for the framework *valdr* so it follow the structure defined by valdr.   
It is also possible add some custom validation by a Custom Validator Implementations based on JSR-303.   
example:

```java

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
 
import javax.validation.Constraint;
import javax.validation.Payload;
 
@Documented
@Constraint(validatedBy = PhoneValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Phone {
  
      
    String message() default "{Error Phone format}";
      
    Class<?>[] groups() default {};
      
    Class<? extends Payload>[] payload() default {};
       
}
```
it is reported in a json file:
```json

"phone" : {
      "com.github.valdr.demo.model.Phone" : {
        "message" : "{Error Phone format}"
      }
 ```
 
The same validator (*PhoneValidator*) must be implemented in back-end (as in example below) and front-end layer (as described above).   
example PhoneValidator class:
```java
public class PhoneValidator implements ConstraintValidator<Phone, String> {
 
    @Override
    public void initialize(Phone paramA) {
    }
 
    @Override
    public boolean isValid(String phoneNo, ConstraintValidatorContext ctx) {
        if(phoneNo == null){
            return false;
        }
        //validate phone numbers of format "1234567890"
        if (phoneNo.matches("\\d{10}")) return true;
        //validating phone number with -, . or spaces
        else if(phoneNo.matches("\\d{3}[-\\.\\s]\\d{3}[-\\.\\s]\\d{4}")) return true;
        //validating phone number with extension length from 3 to 5
        else if(phoneNo.matches("\\d{3}-\\d{3}-\\d{4}\\s(x|(ext))\\d{3,5}")) return true;
        //validating phone number where area code is in braces ()
        else if(phoneNo.matches("\\(\\d{3}\\)-\\d{3}-\\d{4}")) return true;
        //return false if nothing matches the input
        else return false;
    }
 
}
```
