/**
 * Single point of access to the global (Window) interface.
 * Useful for logging, debugging, tests etc.
 */
export default {
    startRedirectingToExternalUrl(url: string) {
        window.location.href = url;
    },

    encodePathSegment: (segment: string): string => window.encodeURIComponent(segment),

    getSessionStorage: () => window.sessionStorage,

    getCurrentOrigin: () => window.location.origin,

    getCurrentQuery: () => new URLSearchParams(window.location.search),

    setWindowTitle(title: string) {
        title ||= '';
        const separator = title ? ' – ' : '';
        document.title = `${title}${separator}CxIntegrations`
    }
}