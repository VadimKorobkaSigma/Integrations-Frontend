import {SimpleLoadingState} from "../services/simpleLoadingState";

export interface ScmConfig {
    id: string,
    name: string,
    state: SimpleLoadingState,
    authServerPageUrl: string | null,
    loadAuthServerPageUrl: () => void
}