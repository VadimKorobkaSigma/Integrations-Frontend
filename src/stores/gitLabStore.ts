import {ScmStore} from "../dtos/scmStore";
import {BasicLoadingState} from "../services/loadingStates";

export default class GitLabStore implements ScmStore {
    id = 'gitlab'
    name = 'GitLab'
    authServerPageUrl = null
    state: BasicLoadingState = 'initial';

    loadAuthServerPageUrl() {
        console.log(`Redirection flow is not yet implemented for ${this.name}`);
    }
}