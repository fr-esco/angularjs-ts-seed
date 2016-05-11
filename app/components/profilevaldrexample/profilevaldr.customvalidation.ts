import ngModuleName from './profilevaldr.module';
'use strict';

const ngServiceName = 'customValidator';

@at.provider(ngModuleName, ngServiceName)
export default class CustomValidator implements angular.IServiceProvider {
  public name = 'custom';
  public regex = new RegExp('^[0-9]*$');

  constructor() {
    this.name = 'com.github.valdr.demo.model.Phone';
    console.log('Provider: ' + ngServiceName + ' loaded');

  }
  public validate(value) {
    if (value === '') {
      return true;
    }
    if (this.regex.test(value)) {
      return true;
    }
    return false;
  };

  public $get() {
    return new CustomValidator();
  }
}
