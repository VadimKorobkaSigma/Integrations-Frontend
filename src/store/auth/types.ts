import { SupportedScm } from '@dtos/scmService';
import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type AuthAction = ActionType<typeof actions>;

export type AuthState = {
    authCode: string | null;
    error: string | null;
    integrationType: SupportedScm | null;
};
