export interface HttpRequestConfig extends RequestInit {
    pathParams?: { [key: string]: string };
}
