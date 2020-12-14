import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { AuthAction, AuthState } from './types';

const initialState: AuthState = {
    authCode: null,
    error: null,
    integrationType: null,
};

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
    console.log('🚀 ~ file: reducer.ts ~ line 13 ~ action', action);
    switch (action.type) {
        case getType(actions.loginUser.success):
            return {
                ...state,
                authCode: action.payload.authCode,
                integrationType: action.payload.integrationType,
                error: null,
            };
        case getType(actions.loginUser.failure):
            return { ...state, authCode: null, error: action.payload };
        case getType(actions.signOut):
            return initialState;
        default:
            return state;
    }
};
