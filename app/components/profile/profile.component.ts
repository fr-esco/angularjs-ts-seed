import ngModuleName from './profile.module';

'use strict';

const ngComponentName = 'tsfnProfile';

@at.component(ngModuleName, ngComponentName, {

  templateUrl: 'profile/profile.component.html'
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
  public invalidElements: string;
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
    if (this.isUserFormValid()) {
      this.dialog.show(
        this.dialog.alert()
          .textContent(this.user.title + ' submitted!')
          .ok('Ok!')
      );
    }
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
  private isUserFormValid(): boolean {
    this.invalidElements = '';
    let form = this.userForm;
    if (form.$valid) {
      return true;
    } else {
      // Scroll to top
      angular.element(document.getElementById('main')).animate({ scrollTop: 0 }, 'slow');

      // Show error messages
      let elements: string[] = [];
      if (!form.title.$valid) elements.push('Username');
      if (!form.email.$valid) elements.push('Email');
      // if (!form.firstName.$valid) elements.push('First name');
      if (!form.lastname.$valid) elements.push('Last name');
      // if (!form.company.$valid) elements.push('Company');
      // if (!form.address.$valid) elements.push('Address');
      // if (!form.city.$valid) elements.push('City');
      if (!form.state.$valid) elements.push('State');
      // if (!form.biography.$valid) elements.push('Biography');
      // if (!form.postalCode.$valid) elements.push('Postal Code');
      if (!form.submissiondate.$valid) elements.push('Submission date');
      // if (!form.gender.$valid) elements.push('Gender');
      // this.anchorScroll('validation-error-message');
      this.invalidElements = elements.join(', ');
      return false;
    }
  }
}
