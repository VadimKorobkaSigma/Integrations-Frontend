import { ScmService } from '@dtos/scmService';
import domWrapper from '../domWrapper';
import ScmConfiguration from '@dtos/scmConfiguration';

export default new (class GitHubService implements ScmService {
    readonly id = 'github';
    readonly name = 'GitHub';

    generatePageUrl(config: ScmConfiguration): string {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            scope: config.scope,
            redirect_uri: `${origin}/login`,
            state: this.id,
        };
        const queryString = new URLSearchParams(query);
        return `https://github.com/login/oauth/authorize?${queryString}`;
    }
})();
