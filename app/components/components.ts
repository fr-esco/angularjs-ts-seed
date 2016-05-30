import Common               from './common/common';
import Env                  from './environment/config';
import Example              from './example/example';
import Material             from './material/material';
import Main                 from './main/main';
import Blog                 from './blog/blog';
import Dashboard            from './dashboard/dashboard';
import Message              from './message/message';
import Profile              from './profile/profile';
import ProfileValdr         from './profilevaldrexample/profilevaldr';
import Table                from './table/table';
import LocaleExample        from './localeexample/localeexample';
import Timezone             from './timezone/timezone';
import I18n                 from './i18n/i18n';
import UacExample           from './uacexample/uacexample';
import HotKeys              from './hotkeys/hotkeys';
import NotificationExample  from './notificationexample/notificationexample';
import Form        from './form/form';

let components = angular.module('app.components', [
  Common,
  Env,
  Material,
  Main,
  Blog,
  Dashboard,
  Message,
  Profile,
  ProfileValdr,
  Table,
  LocaleExample,
  Timezone,
  I18n,
  Example,
  UacExample,
  HotKeys,
  NotificationExample,
  Form
]);

export {components}
