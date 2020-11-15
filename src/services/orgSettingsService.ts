import OrgSettings from "../dtos/orgSettings";

export class OrgSettingsService {
    saveSettings = (scmId: string, orgId: string) => this.requestStub('Saving', scmId, orgId);

    getSettings = (scmId: string, orgId: string): Promise<OrgSettings> => this.requestStub('Loading', scmId, orgId);

    private requestStub(action: string, scmId, orgId) {
        console.log(`${action} settings for the ${scmId}/${orgId} organization.`);
        return new Promise<OrgSettings>(resolve => this.delayedStub(resolve));
    }

    delayedStub(resolve) {
        const result = {team: 'myteam', cxgoSecret: 'mysecret'};
        window.setTimeout(() => resolve(result), 2000);
    }
}