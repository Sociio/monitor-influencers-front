import { combineReducers } from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers/index';
import quickPanel from 'main/quickPanel/store/reducers';
import analyticsDashboardApp from 'main/content/apps/dashboards/analytics/store/reducers/index';
import mailApp from 'main/content/apps/mail/store/reducers/index';
import fileManagerApp from 'main/content/apps/file-manager/store/reducers/index';
import contactsApp from 'main/content/apps/contacts/store/reducers/index';
import calendarApp from 'main/content/apps/calendar/store/reducers/index';
import profilesApp from 'main/content/apps/profiles/store/reducers/index';
import profileApp from 'main/content/apps/profile/store/reducers/index';
import typeaheadsApp from 'main/content/apps/typeaheads/store/reducers/index';
import insightApp from 'main/content/apps/insight/store/reducers/index';

const rootReducer = combineReducers({
  auth,
  fuse,
  analyticsDashboardApp,
  mailApp,
  fileManagerApp,
  contactsApp,
  calendarApp,
  quickPanel,
  profilesApp,
  profileApp,
  typeaheadsApp,
  insightApp
});

export default rootReducer;
