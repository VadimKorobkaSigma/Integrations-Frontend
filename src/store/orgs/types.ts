import Organization from '@dtos/organization';
import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type OrganizationsAction = ActionType<typeof actions>;

export type OrganizationsState = {
    organizations: Organization[];
    error: string | null;
};
