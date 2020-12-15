import { ScmService } from '@dtos/scmService';
import ScmConfiguration from '@dtos/scmConfiguration';
import domWrapper from '../domWrapper';

export default new (class GitLabService implements ScmService {
    id = 'gitlab';
    name = 'GitLab';

    generatePageUrl(config: ScmConfiguration): string {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            redirect_uri: `${origin}/login`,
            response_type: 'code',
            state: 'gitlab',
        };
        const queryString = new URLSearchParams(query);
        return `https://gitlab.com/oauth/authorize?${queryString}&scope=${config.scope}`;
    }
})();
