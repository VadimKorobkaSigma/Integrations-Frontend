export type BasicLoadingState = 'initial' | 'loading' | 'completed' | 'error';

export type OauthExtendedLoadingState = BasicLoadingState | 'invalidOAuthState';

export type WritableLoadingState = BasicLoadingState | 'saving';