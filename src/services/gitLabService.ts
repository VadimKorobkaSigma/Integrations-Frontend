import {ScmConfig} from "../dtos/scmConfig";
import {SimpleLoadingState} from "./simpleLoadingState";

export default class GitLabService implements ScmConfig {
    id = 'gitlab'
    name = 'GitLab'
    authServerPageUrl = null
    state: SimpleLoadingState = 'idle';

    loadAuthServerPageUrl() {
        console.log(`Redirection flow is not yet implemented for ${this.name}`);
    }
}