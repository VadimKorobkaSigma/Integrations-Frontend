import OrgSettings from "../dtos/orgSettings";

export class OrgSettingsService {
    getSettings(scmId: string, orgId: string): Promise<OrgSettings> {
        console.log(`Loading settings for the ${scmId}/${orgId} organization.`);
        return new Promise(resolve => this.delayedStub(resolve));
    }

    delayedStub(resolve) {
        const result = {team: 'myteam', cxgoSecret: 'mysecret'};
        window.setTimeout(() => resolve(result), 2000);
    }
}