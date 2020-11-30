import { ScmService } from '@dtos/scmService';
import ScmConfiguration from '@dtos/scmConfiguration';
import domWrapper from './domWrapper';
import authStore from '@stores/authStore';

export default class GitLabService implements ScmService {
    id = 'gitlab';
    name = 'GitLab';

    generatePageUrl(config: ScmConfiguration): string {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            scope: config.scope,
            redirect_uri: `${origin}/scm/${this.id}/organizations`,
            response_type: 'code',
            state: authStore.createAndRememberState(),
        };
        const queryString = new URLSearchParams(query);
        return `https://gitlab.com/oauth/authorize?${queryString}`;
    }
}
