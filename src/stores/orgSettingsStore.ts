import {WritableLoadingState} from "../services/loadingStates";
import OrgSettings from "../dtos/orgSettings";
import {makeAutoObservable} from "mobx";
import {OrgSettingsService} from "../services/orgSettingsService";

export class OrgSettingsStore {
    state: WritableLoadingState = 'initial';
    orgSettings: OrgSettings = {team: '', cxgoSecret: ''};

    private readonly settingsService = new OrgSettingsService();

    constructor() {
        makeAutoObservable(this);
    }

    async loadOrgSettings(scmId: string, orgId: string) {
        this.state = 'loading';
        try {
            this.orgSettings = await this.settingsService.getSettings(scmId, orgId);
            this.state = 'completed';
        } catch {
            this.state = 'error';
        }
    }

    setPartialSettings(partialValue) {
        this.orgSettings = Object.assign({}, this.orgSettings, partialValue);
    }
}