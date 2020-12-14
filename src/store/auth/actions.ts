import { createAction, createAsyncAction } from 'typesafe-actions';
import { AuthState } from './types';

export const loginUser = createAsyncAction('auth/AUTH_REQUEST', 'auth/AUTH_SUCCESS', 'auth/AUTH_FAILURE')<
    AuthState['integrationType'],
    Omit<AuthState, 'error'>,
    AuthState['error']
>();

export const signOut = createAction('auth/SIGN_OUT')();
