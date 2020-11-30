import { LoadingStateWithSave } from '../services/loadingStates';
import OrgSettings from '../dtos/orgSettings';
import { makeAutoObservable } from 'mobx';
import { OrgSettingsService } from '../services/orgSettingsService';

export class OrgSettingsStore {
    state: LoadingStateWithSave = 'initial';
    orgSettings: OrgSettings = { team: '', cxgoSecret: '' };

    readonly maxLength = {
        team: 255,
        cxgoSecret: 2500,
    };

    private readonly settingsService = new OrgSettingsService();

    constructor() {
        makeAutoObservable(this);
    }

    async loadOrgSettings(scmId: string, orgId: string) {
        this.setState('loading');
        try {
            const settings = await this.settingsService.getSettings(scmId, orgId);
            this.completeLoading(settings);
        } catch (e) {
            console.error(e);
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
