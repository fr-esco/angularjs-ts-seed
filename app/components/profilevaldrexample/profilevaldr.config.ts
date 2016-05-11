// valdr configuration
//  load the validation constraints from back-end
// in order to use this configuration use the option config on the module in profilevaldr.module.ts
// configuration by local file in init.ts

'use strict';

class ProfileModuleConfiguration {
  @at.injectMethod('valdrProvider', 'valdrMessageProvider', '$translateProvider')
  public static valdrConf(valdrProv, valdrMsgProv, translateProv) {
    valdrProv.setConstraintUrl('./components/profilevaldrexample/constraints.json');

    valdrProv.addValidator('customValidator');
    translateProv.translations('en', {
      'message.size': '{{fieldName}} must be between {{min}} and {{max}} characters.',
      'Person.firstName': 'firstName'
    });

    translateProv.translations('it', {
      'message.size': '{{fieldName}} deve essere compreso tra {{min}} e {{max}}.',
      'Person.firstName': 'Nome'
    });
 };
}
export default ProfileModuleConfiguration.valdrConf;
