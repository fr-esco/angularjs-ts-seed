// valdr configuration
//  load the validation constraints from back-end
// in order to use this configuration use the option config on the module in profilevaldr.module.ts
// configuration by local file in init.ts

'use strict';

class ProfileModuleConfiguration {
  @at.injectMethod('valdrProvider', 'valdrMessageProvider')
  public static valdrConf(valdrProv, valdrMsgProv) {
    valdrProv.setConstraintUrl('./components/profilevaldrexample/constraints.json');

    valdrProv.addValidator('customValidator');
 };
}
export default ProfileModuleConfiguration.valdrConf;
