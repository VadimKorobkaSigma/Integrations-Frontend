import {ScmConfig} from "../dtos/scmConfig";
import {BasicLoadingState} from "./loadingStates";

export default class GitLabService implements ScmConfig {
    id = 'gitlab'
    name = 'GitLab'
    authServerPageUrl = null
    state: BasicLoadingState = 'idle';

    loadAuthServerPageUrl() {
        console.log(`Redirection flow is not yet implemented for ${this.name}`);
    }
}