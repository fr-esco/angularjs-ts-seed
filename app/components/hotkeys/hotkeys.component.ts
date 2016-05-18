import ngModuleName from './hotkeys.module';

'use strict';

const ngComponentName = 'tsfnHotkeys';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    myAttribute: '@',
    myOneWayBinding: '<'
  },
  templateUrl: 'hotkeys/hotkeys.component.html',
})
@at.inject('$log', 'hotkeys', '$scope')
export default class HotkeysComponent implements at.OnActivate {
  public title = '';
  public newProduct = { name: '', price: null };
  public loadItem = [
    {
      name: 'Product1',
      price: 2.30
    },
    {
      name: 'Product2',
      price: 2.90
    },
    {
      name: 'Product3',
      price: 1.30
    },
    {
      name: 'Product4',
      price: 5.70
    },
  ];
  public files = [
    'components/hotkeys/hotkeys.component.html',
    'components/hotkeys/hotkeys.component.ts'
      ];
  constructor(private log: angular.ILogService,
    private hotkeys,
    private scope: angular.IScope
  ) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }
  public $onInit() {
    var vm = this;
    this.hotkeys.bindTo(this.scope)
      .add({
        combo: 'ctrl+v',
        description: 'Confirm',
        allowIn: ['INPUT'],
        callback: function (eve, ht) {
          eve.preventDefault();
          vm.addNewProduct();
        }
      });
    // show the cheatsheet when load this route
    console.log(this.scope);
    this.hotkeys.toggleCheatSheet();

  }
  public addNewProduct() {

    if (this.newProduct.name != '' && this.newProduct.price != null) {
      this.loadItem.push(this.newProduct);
      this.newProduct = { name: '', price: null };
    }
    if (this.loadItem.length === 10) {
      this.hotkeys.del('ctrl+v');
    }
  }

}

