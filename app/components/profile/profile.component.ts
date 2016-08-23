import ngModuleName from './profile.module';

'use strict';

const ngComponentName = 'tsngProfile';

@at.component(ngModuleName, ngComponentName, {

  templateUrl: 'components/profile/profile.component.html'
})
@at.inject('$log', '$mdDialog', '$q')
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
    state: '',
    biography: ['We are young and ambitious full service design and technology company.',
      'Our focus is JavaScript development and User Interface design.'].join(' '),
    postalCode: '220007',
    birthdate: '',
    gender: '',
    age: null
  };

  public files = [
    'components/profile/profile.component.html',
    'components/profile/profile.component.ts',
    'components/profile/profile.module.ts'
  ];

  constructor(private log: angular.ILogService,
    private dialog: angular.material.IDialogService,
    private q: angular.IQService) {
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
    const confirm = this.q.defer();
    if (this.userForm.$dirty) {
      this.dialog.show(
        this.dialog.confirm()
          .textContent('You have unsaved changes. Do you want to leave the page?')
          .ok('YES')
          .cancel('NO')
      ).then(() => { confirm.resolve(true); }, () => { confirm.resolve(false); });
      return confirm.promise;
    }
    return this.q.when(true);
  }

}
