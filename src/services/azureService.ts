import { ScmService } from '@dtos/scmService';
import ScmConfiguration from '@dtos/scmConfiguration';
import domWrapper from './domWrapper';
import authStore from '@stores/authStore';

export default class AzureService implements ScmService {
    id = 'azure';
    name = 'Azure';

    generatePageUrl(config: ScmConfiguration): string {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            scope: config.scope,
            // client_id: '881BC8F1-D53B-462B-AAB7-F91C4D26E71F',
            // scope: 'vso.code_full vso.project_manage',
            redirect_uri: `${origin}/scm/${this.id}/organizations`,
            response_type: 'Assertion',
            state: authStore.createAndRememberState(),
        };
        console.log('AzureService ~ generatePageUrl ~ query', query);
        const queryString = new URLSearchParams(query);
        return `https://app.vssps.visualstudio.com/oauth2/authorize?${queryString}`;
    }
}
