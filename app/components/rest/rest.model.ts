'use strict';

type Key = number;

const keyType = 'number';

export interface IRestClient {
  baseUrl: string;
}

export abstract class BaseRestClient<T> implements IRestClient {
  public get baseUrl() { return ''; }
  public set baseUrl(url: string) { throw new TypeError('Base Url is readonly'); }

  protected get baseList() { return this.restangular.all(this.baseUrl); }
  protected baseElement(id: Key) { return this.restangular.one(this.baseUrl, id); }

  constructor(protected restangular: restangular.IService) { }

  public search(params?) {
    return this.baseList.getList<T>(params);
  }

  public create(element: T) {
    return this.baseList.post<T>(element);
  }

  public read(id: Key) {
    return this.baseList.get<T>(id);
  }

  public update(element: T) {
    return this.baseList.post<T>(element);
  }

  public delete(element: T);
  public delete(element: Key);
  public delete(element) {
    let id = typeof element === keyType ? element : element.id;
    return this.baseElement(id).remove();
  }
}
