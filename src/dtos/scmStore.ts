import {BasicLoadingState} from "../services/loadingStates";

export interface ScmStore {
    id: string,
    name: string,
    state: BasicLoadingState,
    authServerPageUrl: string | null,
    loadAuthServerPageUrl: () => void
}