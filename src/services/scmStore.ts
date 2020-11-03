import {ScmConfig} from "../dtos/scmConfig";
import GitHubService from "./gitHubService";
import GitLabService from "./gitLabService";


const scmConfigs: ScmConfig[] = [
    new GitHubService(),
    new GitLabService(),
]

export default class ScmStore {
    getById(id: string): ScmConfig | undefined {
        return scmConfigs.find(config => config.id === id);
    }

    getAll(): ScmConfig[] {
        return scmConfigs;
    }
}