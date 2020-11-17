import {ScmStore} from "../dtos/scmStore";
import ScmConfiguration from "../dtos/scmConfiguration";

export default class GitLabStore implements ScmStore {
    id = 'gitlab'
    name = 'GitLab'

    generatePageUrl(config: ScmConfiguration): string {
        console.log(`Redirection flow is not yet implemented for ${this.name}`);
        return '';
    }
}