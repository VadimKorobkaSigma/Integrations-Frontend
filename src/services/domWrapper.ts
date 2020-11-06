/**
 * Single point of access to the global (Window) interface.
 */
export default {
    startRedirectingToExternalUrl(url: string) {
        window.location.href = url;
    },

    encodePathSegment: (segment: string) => window.encodeURIComponent(segment),

    getSessionStorage: () => window.sessionStorage,

    getCurrentOrigin: () => window.location.origin,

    getCurrentQuery: () => new URLSearchParams(window.location.search)
}