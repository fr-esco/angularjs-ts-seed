import Common    from './common/common';
import Example   from './example/example';
import Exception from './exception/exception';
import Material  from './material/material';
import Markdown  from './markdown/markdown';
import Main      from './main/main';
import Blog      from './blog/blog';
import Dashboard from './dashboard/dashboard';
import Message   from './message/message';
import Profile   from './profile/profile';
import Rest      from './rest/rest';
import Showcase  from './showcase/showcase';
import Table     from './table/table';
import Locale  from './locale/locale';

let components = angular.module('app.components', [
  Common,
  Material,
  Exception,
  Main,
  Blog,
  Dashboard,
  Message,
  Profile,
  Rest,
  Showcase,
  Table,
  Locale,

  Example
]);

export {components}
