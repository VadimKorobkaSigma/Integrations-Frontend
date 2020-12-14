import { createAsyncAction } from 'typesafe-actions';
import { OrganizationsState } from './types';

export const fetchOrganizations = createAsyncAction(
    'orgs/FETCH_ORGANIZATIONS_REQUEST',
    'orgs/FETCH_ORGANIZATIONS_SUCCESS',
    'orgs/FETCH_ORGANIZATIONS_FAILURE',
)<void, OrganizationsState['organizations'], OrganizationsState['error']>();
