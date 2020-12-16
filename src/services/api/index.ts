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

    public getScmConfiguration = async (scmId: SupportedScm): Promise<ScmConfiguration> => {
        const response = await httpClient.get(`${scmId}/config`);
        return response.data;
    };

    public getOrganizations = (): Promise<ScmConfiguration> => {
        return httpClient
            .post(`${this.scmType}/user/orgs`, undefined, {
                authCode: this.authCode,
            })
            .then((r) => r.json());
    };

    public getOrganizationRepos = async (orgId: string): Promise<Repository[]> => {
        const response = await httpClient.get(`${this.scmType}/orgs/${orgId}/repos`);
        return response.data;
    };

    public installWebhook = (orgId: string, repId: string) => {
        return httpClient.post(`${this.scmType}/orgs/${orgId}/repos/${escape(repId)}/webhooks`).then((r) => r.json());
    };

    public removeWebhook = (orgId: string, repId: string, webhookId: string) => {
        return httpClient.request(`${this.scmType}/orgs/${orgId}/repos/${escape(repId)}/webhooks/${webhookId}`, {
            method: 'delete',
        });
    };

    public getSettings = async (orgId: string): Promise<OrgSettings> => {
        const response = await httpClient.get(`${this.scmType}/orgs/${orgId}/settings`);
        return response.data;
    };

    public setSettings = async (orgId: string, settings: OrgSettings) => {
        return httpClient.request(`${this.scmType}/orgs/${orgId}/settings`, { method: 'PUT' }, settings);
    };
}

export default new Api();
