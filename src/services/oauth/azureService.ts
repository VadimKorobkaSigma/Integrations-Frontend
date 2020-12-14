import { ScmService } from '@dtos/scmService';
import ScmConfiguration from '@dtos/scmConfiguration';
import domWrapper from '../domWrapper';

export default new (class AzureService implements ScmService {
    id = 'azure';
    name = 'Azure';

    generatePageUrl(config: ScmConfiguration): string {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            scope: config.scope,
            redirect_uri: `${origin}/login`,
            response_type: 'Assertion',
            state: 'azure',
        };
        const queryString = new URLSearchParams(query);
        return `https://app.vssps.visualstudio.com/oauth2/authorize?${queryString}`;
    }
})();
