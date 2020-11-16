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
        this.setState('loading');
        try {
            const settings = await this.settingsService.getSettings(scmId, orgId);
            this.completeLoading(settings);
        } catch {
            this.setState('error');
        }
    }

    async saveOrgSettings(scmId: string, orgId: string) {
        this.setState('saving');
        try {
            await this.settingsService.saveSettings(scmId, orgId, this.orgSettings);
            this.setState('completed');
        } catch {
            this.setState('error');
        }
    }

    setPartialSettings(partialValue) {
        this.orgSettings = Object.assign({}, this.orgSettings, partialValue);
    }

    private setState(value) {
        // Using a setter to avoid mobx warnings.
        this.state = value;
    }

    private completeLoading(settings: OrgSettings) {
        this.orgSettings = settings;
        this.state = 'completed';
    }
}