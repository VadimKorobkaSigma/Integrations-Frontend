import ScmConfiguration from "./scmConfiguration";

export interface ScmService {
    id: string,
    name: string,

    generatePageUrl(config: ScmConfiguration): string
}