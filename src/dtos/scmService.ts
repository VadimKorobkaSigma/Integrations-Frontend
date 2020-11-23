import ScmConfiguration from "./scmConfiguration";

export interface ScmService {
    /**
     * Used as a parameter in API requests.
     */
    id: string;

    /**
     * Displayed in the UI.
     */
    name: string;

    /**
     * Generates an SCM-specific URL. The URL will be used to redirect the user to the SCM authorization page.
     */
    generatePageUrl(config: ScmConfiguration): string;
}