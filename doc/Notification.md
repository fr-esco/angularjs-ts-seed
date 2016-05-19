# Notification module - Starter kit 0.1

## Introduction  
The goal of this readme is to show how to configure and use the notification component in your module.

# Notification provider

The notification module is defined in `notification.provider.ts` file in `app/components/notification` folder.

Notification provider exposes 4 different methods for 4 notification types: 
* `success`
* `warning`
* `error`
* `info`

```typescript
public success(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService> 

public warning(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService>
 
public error(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService>
 
public info(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService> 
```
Every method takes as input a notification message, an optional configuration and an optional array of custom buttons for custom actions. Every method returns a promise resolving the same action value of the custom button that has been clicked.

# Custom buttons with actions

**Custom actions**

```typescript
interface INotificationAction {
  value: string | Function;
  label: string;
  icon?: string;
}
```

It is possible to show custom buttons on the notification component py passing as argument an object of `INotificationAction` type:
* `value:` It is a value that is returned from notification method as promise;
* `label:` It is a string that will appear on notification as label of the custom button;
* `icon:` It is an optional icon that will appear near che label of the custom button.
 
Developer can handle custom actions like this example:

```javascript
let actions: INotificationAction[] = [
        {
          value: 'action1',
          label: 'string',
          icon: 'done'
        },
        {
          value: () => { alert('test2'); },
          label: 'function',
        }
      ];
    
notificationService.success('message', config, actions)
        .then(function (actionValue) {
          console.log(actionValue);
        });
``` 

# Configuration and customization

## Configuration

### Default configuration

The Notification provider is configurable by changing values in `notification.config.ts` file.
Notification provider accepts the following configurations:
* `delay`
* `vertical position`
* `horizontal position`
* `width`
* `DOM parent element`

### Angular default module configuration
```typescript
[...]
let config = (notificationProvider: NotificationProvider) => {
  notificationProvider.delay(2000);
  notificationProvider.domParent('md-content');
  notificationProvider.horizontalPosition('right');
  notificationProvider.verticalPosition('top');
  notificationProvider.width(100);
};
[...]
```

### Configuration override

```javascript
let config: INotificationConfig = {
    verticalPos: 'bottom',
    horizontalPos: 'left',
    delay: 5000,
    width: 70
  };
    
notificationService.info('message', config);
```

##Customization

It is possible to customize `icons` and notification `position` classes by editing the following arrays in `notification.config.ts`: 

**Icons**: maps notification type selectors to angular-material (or custom) icons values.
 
```typescript
[...]
const icons = {
  'success': 'check_circle',
  'warning': 'warning',
  'error': 'error',
  'info': 'info'
};
[...]
```

**Positions**: maps notification position selectors to angular-material (or custom) position layouts.
 
```typescript
[...]
const positions = {
  'top': 'md-top',
  'right': 'md-right',
  'left': 'md-left',
  'bottom': 'md-bottom'
};
[...]
```
