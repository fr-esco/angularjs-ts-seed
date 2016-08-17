import ngModuleName from './showcase.module';

import ShowcaseService from './showcase.provider';

'use strict';

interface ITab {
  title: string;
  options: any;
  content: string;
}

const ngComponentName = 'tsfnShowcase';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    fileList: '<?',
    lazy: '<?',
    title: '@'
  },
  templateUrl: 'showcase/showcase.component.html'
})
@at.inject('showcase', '$filter', '$log', '$q', '$timeout')
export default class ShowcaseComponent implements at.OnInit {
  public fileList: string[];
  public lazy: boolean;

  public showSource = false;
  public selected = 0;
  public tabs: ITab[] = [];

  public loaded = false;
  public loading = false;

  private modes = {
    html: 'htmlmixed',
    js: 'javascript',
    json: { name: 'javascript', json: true },
    scss: 'sass',
    ts: { name: 'javascript', typescript: true }
  };

  private markdownFilter;

  constructor(private showcase: ShowcaseService,
    private filter: angular.IFilterService,
    private log: angular.ILogService,
    private q: angular.IQService,
    private timeout: angular.ITimeoutService,
    private showdown) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));

    this.markdownFilter = filter('markdown');
  }

  public $onInit() {
    if (!this.fileList)
      this.fileList = [
        'components/showcase/showcase.scss',
        'components/showcase/showcase.readme.md'
      ];
    if (!this.lazy)
      this.load();
  }

  public toggleSource() {
    this.load().then(loaded => loaded ? this.toggleSourceInternal() : this.q.reject());
  }

  public markdown(tab: ITab, convert = false) {
    if (tab.options.mode === 'md') {
      if (convert)
        tab.content = this.markdownFilter(tab.content);
      return true;
    }

    return false;
  }

  private toggleSourceInternal() {
    this.showSource = !this.showSource;
  }

  private load() {
    if (!this.loaded) {
      // this.fileList.push('components/showcase/showcase.scss');
      return this.showLoading()
        .then(() => this.showcase.load(this.fileList))
        .then(files => this.tabs = this.fileList.map(path => this.fileToTab(path, files[path])))
        .then(() => this.loaded = true)
        .then(() => this.hideLoading());
    } else
      return this.q.when(true);
  }

  private showLoading() {
    return this.q.when(this.loading = true);
  }

  private hideLoading() {
    let deferred = this.q.defer();
    let delay = 200 + 15 * this.fileList.length;
    this.timeout(() => deferred.resolve((this.loading = false) || true), delay);
    return deferred.promise;
  }

  private fileToTab(path: string, content: string): ITab {
    let parts = path.split('/');
    let name = parts[parts.length - 1];

    parts = name.split('.');
    let ext = parts[parts.length - 1];

    let options = {
      mode: this.modes[ext] || ext,
      theme: 'material',
      lineNumbers: true,
      readOnly: true,
      autoRefresh: true
    };

    // this.log.debug(name, options);

    return {
      title: name,
      options: options,
      content: content
    };
  }
}
