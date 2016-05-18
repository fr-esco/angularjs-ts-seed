import ngModuleName from './profilevaldr.module';

'use strict';

const ngComponentName = 'tsfnProfileValdr';

@at.component(ngModuleName, ngComponentName, {

  templateUrl: 'profilevaldrexample/profilevaldr.component.html'
})
@at.inject('$log', '$mdDialog', '$q', 'valdr')
export default class ProfileComponent implements at.OnActivate, at.CanDeactivate {
  public title: string;
  public userForm;
  public user = {
    title: 'Admin',
    email: 'contact@flatlogic.com',
    firstName: '',
    lastName: '',
    company: 'FlatLogic Inc.',
    address: 'Fabritsiusa str, 4',
    city: 'Minsk',
    phone: '',
    state: '',
    biography: ['We are young and ambitious full service design and technology company.',
      'Our focus is JavaScript development and User Interface design.'].join(' '),
    postalCode: '220007',
    birthdate: '',
    gender: '',
    age: null
  };

  public files = [
    'components/profilevaldrexample/profilevaldr.config.ts',
    'components/profilevaldrexample/profilevaldr.component.html',
    'components/profilevaldrexample/profilevaldr.component.ts',
    'components/profilevaldrexample/profilevaldr.module.ts',
    'components/profilevaldrexample/constraints.json',
    'components/profilevaldrexample/i18n/it.json',
    'components/profilevaldrexample/i18n/en.json'
  ];

  constructor(private log: angular.ILogService,
    private dialog: angular.material.IDialogService,
    private q: angular.IQService,
    private valdr: any) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }
  public submitUser() {
    this.dialog.show(
      this.dialog.alert()
        .textContent(this.user.title + ' submitted!')
        .ok('Ok!')
    );
  }
  public setForm(form) {
    this.userForm = form;

  }
  public $routerCanDeactivate() {

    var confirm = this.q.defer();
    if (this.userForm.$dirty) {
      this.dialog.show(
        this.dialog.confirm()
          .textContent('You have unsaved changes. Do you want to leave the page?')
          .ok('YES')
          .cancel('NO')
      ).then(() => { confirm.resolve(true); }, () => { confirm.resolve(false); });
      return confirm.promise;
    }

  }
 /* public getMessage(nameValidator) {
    return this.valdr.getConstraints();
  }
*/
}
