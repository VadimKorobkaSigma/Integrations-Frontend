import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { EmptyAction } from 'typesafe-actions';

import authReducer from './auth/reducer';
import orgsReducer from './orgs/reducer';

import { AuthAction } from './auth/types';
import { OrganizationsAction } from './orgs/types';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    auth: authReducer,
    orgs: orgsReducer,
    router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = AuthAction | OrganizationsAction | EmptyAction<string>;

export default rootReducer;
