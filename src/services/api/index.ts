import Organization from '@dtos/organization';
import OrgSettings from '@dtos/orgSettings';
import { Repository } from '@dtos/repository';
import ScmConfiguration from '@dtos/scmConfiguration';
import { SupportedScm } from '@dtos/scmService';
import httpClient from './httpClient';

class Api {
    public get authCode(): string | null {
        return localStorage.getItem('SCM_CODE');
    }

    public get scmType(): SupportedScm | null {
        return localStorage.getItem('SCM_TYPE') as SupportedScm;
    }

    public getScmConfiguration = (scmId: SupportedScm): Promise<ScmConfiguration> => {
        return httpClient.get(`${scmId}/config`).then(({ data }) => data);
    };

    public getOrganizations = (): Promise<Organization[]> => {
        return httpClient
            .post(`${this.scmType}/user/orgs`, undefined, {
                authCode: this.authCode,
            })
            .then((r) => r.json());
    };

    public getOrganizationRepos = (orgId: string): Promise<Repository[]> => {
        return httpClient.get(`${this.scmType}/orgs/${orgId}/repos`).then(({ data }) => data);
    };

    public installWebhook = (orgId: string, repId: string): Promise<{ webhookId: string }> => {
        return httpClient.post(`${this.scmType}/orgs/${orgId}/repos/${escape(repId)}/webhooks`).then((r) => r.json());
    };

    public removeWebhook = (orgId: string, repId: string, webhookId: string) => {
        return httpClient.request(`${this.scmType}/orgs/${orgId}/repos/${escape(repId)}/webhooks/${webhookId}`, {
            method: 'delete',
        });
    };

    public getSettings = (orgId: string): Promise<OrgSettings> => {
        return httpClient.get(`${this.scmType}/orgs/${orgId}/settings`).then(({ data }) => data);
    };

    public setSettings = (orgId: string, settings: OrgSettings) => {
        return httpClient.request(`${this.scmType}/orgs/${orgId}/settings`, { method: 'PUT' }, settings);
    };
}

export default new Api();
