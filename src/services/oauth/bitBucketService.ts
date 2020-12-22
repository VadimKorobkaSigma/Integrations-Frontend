import { ScmService } from '@dtos/scmService';
import ScmConfiguration from '@dtos/scmConfiguration';
import domWrapper from '../domWrapper';

export default new (class BitBucketService implements ScmService {
    id = 'bitbucket';
    name = 'BitBucket';

    generatePageUrl(config: ScmConfiguration): string {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            scope: config.scope,
            // redirect_uri: `${origin}/login`,
            response_type: 'code',
            state: 'bitbucket',
        };
        const queryString = new URLSearchParams(query);
        return `https://bitbucket.org/site/oauth2/authorize?${queryString}`;
    }
})();
