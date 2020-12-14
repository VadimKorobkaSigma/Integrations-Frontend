import { SagaIterator } from 'redux-saga';
import { call, delay, put, take } from 'redux-saga/effects';

import * as actions from './actions';
import AzureService from '@services/oauth/azureService';
import GitHubService from '@services/oauth/gitHubService';
import GitLabService from '@services/oauth/gitLabService';
import api from '@services/api';
import { parseQuery } from '@services/utils';
import { push } from 'connected-react-router';

export function* authSaga(): SagaIterator {
    while (true) {
        let { code, state } = yield call(getScmCode);

        if (code && state) {
            localStorage.setItem('SCM_CODE', code);
            localStorage.setItem('SCM_TYPE', state);
            yield put(actions.loginUser.success({ authCode: code, integrationType: state }));
        }
        const { payload: integrationType } = yield take(actions.loginUser.request);
        const config = yield call(api.getScmConfiguration, integrationType);

        let url = location.origin;
        switch (integrationType) {
            case 'azure':
                url = AzureService.generatePageUrl(config);
                break;
            case 'github':
                url = GitHubService.generatePageUrl(config);
                break;
            case 'gitlab':
                url = GitLabService.generatePageUrl(config);
                break;
            default:
                break;
        }
        window.open(url, '_self');
    }
}

function getScmCode() {
    let { code, state } = parseQuery(location.search);

    if (code && state) {
        return { code, state };
    }
    // code = localStorage.getItem('SCM_CODE');
    // state = localStorage.getItem('SCM_TYPE');
    // if (code && state) {
    //     return { code, state };
    // }

    return {};
}
