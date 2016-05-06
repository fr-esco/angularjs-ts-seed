# User Access Control (UAC)

You can make visible (or not) and enabled (or not) any input field, button or widget
according to user-related configurations. 

## Configuration Point

Given `FOO` is the key of your widget, you can control its availability as follows:
* Mark your widget with the `tsfnUacCp` directive;
* Use the widget key as the value of the `tsfnUacName` attribute;
* Set the implication as the value of the `tsfnUacImplication` attribute:
  * visible
  * !visible
  * editable
  * !editable

```html
<md-radio-button tsfn-uac-cp tsfn-uac-name="FOO" tsfn-uac-implication="!editable">My Option</md-radio-button>
```

You can also use this alternative (shorter) syntax:

```html
<md-radio-button tsfn-uac-cp="{name: 'FOO', implication: '!editable'}">My Option</md-radio-button>
```

**Note:** Attribute values (for the former) and the object literal (for the latter form)
are not evaluated against the `scope`.

### Customization

The endpoint for this validation is configured as the constant `endpoint.configPoint`.

## Permission

Given `BAR` is the object you want to perform your action on, you can control its availability as follows:
* Mark your widget with the `tsfnUacPerm` directive;
* Use the object identifier as the value of the `tsfnUacObject` attribute;
* Use the operation identifier as the value of the `tsfnUacOperation` attribute:
  * all
  * delete
  * update
  * create
  * execute
  * read
* Set the implication as the value of the `tsfnUacImplication` attribute:
  * visible
  * !visible
  * editable
  * !editable

```html
<md-radio-button tsfn-uac-perm tsfn-uac-object="BAR" tsfn-uac-operation="CREATE" tsfn-uac-implication="!visible">My Option</md-radio-button>
```

You can also use this alternative (shorter) syntax:

```html
<md-radio-button tsfn-uac-perm="{object: 'BAR', operation: 'CREATE', implication: '!visible'}">My Option</md-radio-button>
```

**Note:** Attribute values (for the former) and the object literal (for the latter form)
are not evaluated against the `scope`.

### Customization

The endpoint for this validation is configured as the constant `endpoint.permission`.
