import Blog      from './blog/blog'
import Common    from './common/common'
import Dashboard from './dashboard/dashboard'
import Env       from './environment/config'
import Example   from './example/example'
import Exception from './exception/exception'
import I18n      from './i18n/i18n'
import Locale    from './locale/locale'
import Main      from './main/main'
import Markdown  from './markdown/markdown'
import Material  from './material/material'
import Message   from './message/message'
import Profile   from './profile/profile'
import Rest      from './rest/rest'
import Showcase  from './showcase/showcase'
import Table     from './table/table'
import Timezone  from './timezone/timezone'

let components = angular.module('app.components', [
  Common,
  Env,
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
  Timezone,
  I18n,
  Example,
])

export {components}
