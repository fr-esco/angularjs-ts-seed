import Common    from './common/common';
import Example   from './example/example';
import Material  from './material/material';
import Markdown  from './markdown/markdown';
import Main      from './main/main';
import Dashboard from './dashboard/dashboard';
import Message   from './message/message';
import Profile   from './profile/profile';
import Showcase  from './showcase/showcase';
import Table     from './table/table';
import Locale  from './locale/locale';

let components = angular.module('app.components', [
  Common,
  Material,
  Main,
  Dashboard,
  Message,
  Profile,
  Showcase,
  Table,
  Locale,

  Example
]);

export {components}
