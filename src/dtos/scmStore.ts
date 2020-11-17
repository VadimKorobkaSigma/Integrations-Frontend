import ScmConfiguration from "./scmConfiguration";

export interface ScmStore {
    id: string,
    name: string,

    generatePageUrl(config: ScmConfiguration): string
}