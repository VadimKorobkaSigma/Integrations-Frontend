export type BasicLoadingState = 'idle' | 'loading' | 'completed' | 'error';

export type OauthExtendedLoadingState = BasicLoadingState | 'invalidOAuthState';