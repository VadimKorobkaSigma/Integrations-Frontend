import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { OrganizationsAction, OrganizationsState } from './types';

const initialState: OrganizationsState = {
    organizations: [],
    error: null,
};

export default (state: OrganizationsState = initialState, action: OrganizationsAction): OrganizationsState => {
    console.log('🚀 ~ file: reducer.ts ~ line 13 ~ action', action);
    switch (action.type) {
        case getType(actions.fetchOrganizations.success):
            return {
                ...state,
                organizations: action.payload,
                error: null,
            };
        case getType(actions.fetchOrganizations.failure):
            return { ...state, organizations: [], error: action.payload };
        default:
            return state;
    }
};
