import ngModuleName from './widget.module';

import {ICountryItem} from '../../../common/country.model';
import CountryService from '../../../common/country.service';

'use strict';

const ngControllerName = 'AutocompleteController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('countryService', '$log', '$q', '$timeout')
export default class AutocompleteController {

  public countries: Array<ICountryItem> = [];
  public selectedCountry: ICountryItem;
  public searchText: string;
  public disableCaching = true;

  constructor(private countryService: CountryService,
    private log: angular.ILogService,
    private q: angular.IQService,
    private timeout: angular.ITimeoutService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    countryService.loadAllItems().then(countries => this.countries = [].concat(countries));
  }

  public querySearch(query?: string) {
    let results = query ? this.countries.filter(this.createFilterFor(query)) : [],
      deferred = this.q.defer();
    this.timeout(() => deferred.resolve(results), Math.random() * 1000, false);
    return deferred.promise;
  }

  private createFilterFor(query: string) {
    let lowercaseQuery = angular.lowercase(query);
    return country => country.value.indexOf(lowercaseQuery) === 0;
  }
}
