import ngModuleName from './uacexample.module';

'use strict';

const ngComponentName = 'tsfnUacExample';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'uacexample/uacexample.component.html'
})

@at.inject('$log')
export default class UacexampleComponent {
  public files = [
    [
      'components/uacexample/uacexample.component.html'
    ]
  ];

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
