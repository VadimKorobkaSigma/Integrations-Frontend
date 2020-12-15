import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, spawn } from 'redux-saga/effects';

import { authSaga } from './auth/sagas';
import { organizationsSaga } from './orgs/sagas';

import rootReducer, { history } from './rootReducer';

export function* rootSaga() {
    yield all([spawn(authSaga), spawn(organizationsSaga)]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware, routerMiddleware(history)));

sagaMiddleware.run(rootSaga);

export default store;
