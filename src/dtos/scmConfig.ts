import {BasicLoadingState} from "../services/loadingStates";

export interface ScmConfig {
    id: string,
    name: string,
    state: BasicLoadingState,
    authServerPageUrl: string | null,
    loadAuthServerPageUrl: () => void
}