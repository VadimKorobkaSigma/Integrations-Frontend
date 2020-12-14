import { SagaIterator } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import * as authActions from '@store/auth/actions';
import * as actions from './actions';
import api from '@services/api';

export function* organizationsSaga(): SagaIterator {
    while (true) {
        try {
            yield take(authActions.loginUser.success);
            const organizations = yield call(api.getOrganizations);
            console.log('organizationsSaga ~ organizations', organizations);
            yield put(actions.fetchOrganizations.success(organizations));
        } catch (error) {
            console.error(error);
            yield put(actions.fetchOrganizations.failure(error));
        }
    }
}
