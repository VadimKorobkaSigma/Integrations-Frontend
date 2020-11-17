import {ScmStore} from "../dtos/scmStore";
import authStore from "./authStore";
import domWrapper from "../services/domWrapper";
import ScmConfiguration from "../dtos/scmConfiguration";

export default class GitHubStore implements ScmStore {
    readonly id = 'github'
    readonly name = 'GitHub'

    generatePageUrl(config: ScmConfiguration): string {
        const origin = domWrapper.getCurrentOrigin();
        const query = {
            client_id: config.clientId,
            scope: config.scope,
            redirect_uri: `${origin}/scm/${this.id}/organizations`,
            state: authStore.createAndRememberState()
        };
        const queryString = new URLSearchParams(query);
        return `https://github.com/login/oauth/authorize?${queryString}`;
    }
}