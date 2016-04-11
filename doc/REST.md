# REST (REpresentational State Transfer)

Guide for integrating REST (Level 2) services into your SPA (Single Page Application).

## Technology Stack

* AngularJS **1.5.x**
* Angular Component Router ([doc](https://docs.angularjs.org/guide/component-router))
* Restangular ([doc](https://github.com/mgonto/restangular))

### Mock

* Backend REST API Mock
  * json-mock ([doc](https://github.com/therebelbeta/json-mock))
  * faker ([doc](https://github.com/marak/Faker.js))

## Installation

```bash
npm install
```

## Get Started

In order to access any available Resource, you need to know its API endpoint.

Then, you can configure the Base API URL of all services by the following:

```js
// app/components/rest/rest.config.ts

let config = (restangularProvider: restangular.IProvider) => {
  restangularProvider.setBaseUrl('<protocol>://<host>:<port>/');
};
```

### Mock

The command below starts a REST server that listens on `localhost:3000`:

```bash
gulp rest
```

Use either `--support` or `-s` for more detailed instructions.

## Client Service

Let's assume you would like to access a `Post` resource.

```bash
GET     /posts    # retrieve a list of posts
GET     /posts/1  # retrieve the post with id == 1
PUT     /posts/1  # update the post with id == 1
POST    /posts    # create a new post according to the sent parameters
DELETE  /posts/1  # delete the post with id == 1
```

First of all, you need an Angular Service that enables to perform all CRUD operations.
So, you can use the service generator with the new option `--client`.

```bash
gulp gen:service --name post --path blog/post --client
```

The command provides you a `blog/post/post-client.service` ready to interact with the 
resource `Post` (ideally mapped by an `IPost` interface exported by `blog/post/post.model`)
via the inherited (default) methods (respectively):

```bash
GET     /posts    # postClient.search()
GET     /posts/1  # postClient.read(1)
PUT     /posts/1  # postClient.update(IPost)
POST    /posts    # postClient.create(IPost)
DELETE  /posts/1  # postClient.delete(IPost | 1)
```

The resource URL is configured via its read-only property `baseUrl`.

**Remember** to register it in `blog/post/post.ts` to make it available to Angular.

### Customization

You can change the default behavior for all Client Services by editing `app/components/rest/rest.model.ts`, which uses **Restangular** under the hood.

## Components

### Service setup

In order to use a Service Client, as it is an Angular Service, you only need to inject it.

And, if you want Typescript features on it, remember the `import` statement.

```js
// app/components/blog/post/post-list.component.ts

import ngModuleName from './post.module';
import PostClient from './post-client.service';

const ngComponentName = 'tsfnPostList';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'blog/post/post-list.component.html'
})
@at.inject('postClient', '$log')
export default class PostListComponent {
  constructor(private postClient: PostClient,
    private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
```

### Service usage

The best way to retrieve the data you need as soon as you navigate to your routed Component
is to exploit the [Angular Component Router Lifecycle](https://docs.angularjs.org/guide/component-router#router-lifecycle-hooks),
in particular the `$routerOnActivate` hook (made available to Typescript by the `angular.OnActivate` interface).

```js
// app/components/blog/post/post-list.component.ts

import {IPost} from './post.model';

export default class PostListComponent implements angular.OnActivate {
  public posts: IPost[];

  public $routerOnActivate() {
    return this.postClient.search()
      .then(data => this.posts = data);
  }
}
```

**Note** that every Service Client call is *Promise-based*.

An example for a Component which deals with a single Post (eg. `/posts/1`) follows:

```js
// app/components/blog/post/post-detail.component.ts

import ngModuleName from './post.module';

import {IPost} from './post.model';
import PostClient from './post-client.service';

'use strict';

const ngComponentName = 'tsfnPostDetail';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'blog/post/post-detail.component.html'
})
@at.inject('postClient', '$log')
export default class PostDetailComponent implements angular.OnActivate {
  public post: IPost;

  constructor(private postClient: PostClient,
    private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: angular.ComponentInstruction) {
    return this.postClient.read(next.params['id'])
      .then(data => this.post = data);
  }
}
```