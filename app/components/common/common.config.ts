import ngModuleName from './common.module';

'use strict';

// @at.constantObj(ngModuleName, 'appCommonValue')
@at.valueObj(ngModuleName, 'appCommonValue')
class CommonValue {
  public static appLanguage = 'en';
  public static appSourceLanguage = 'en';
}

class CommonWrapper {
  @at.constantProp(ngModuleName)
  // @at.valueProp(ngModuleName)
  public static appTitle: string = 'Application';

  // @at.constantFunc(ngModuleName)
  @at.valueFunc(ngModuleName)
  public appHello(): string {
    return 'Hello, ' + CommonWrapper.appTitle;
  }
}
