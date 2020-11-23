import * as React from "react";
import {FormEvent} from "react";
import {RouteComponentProps} from "react-router-dom";
import domWrapper from "../services/domWrapper";
import MainContext from "../services/mainContext";
import {LoadingStateWithSave} from "../services/loadingStates";
import {observer} from "mobx-react";
import OrgSettings from "../dtos/orgSettings";
import Breadcrumbs from "../components/breadcrumbs";

type PropType = RouteComponentProps<{
    scmId: string,
    orgId: string,
}>;

export default observer(class extends React.Component<PropType> {
    static contextType = MainContext;

    // Maps loading state names to UI messages.
    private readonly loadingStateMapping: { [key in LoadingStateWithSave]?: string } = {
        loading: 'Loading...',
        saving: 'Saving...',
        error: 'An error has occurred.'
    };

    constructor(props: PropType) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    render() {
        const store = this.getStore();
        const isBusy = (store.state === 'loading' || store.state === 'saving');
        const settings = store.orgSettings;
        return <>
            <Breadcrumbs items={this.getBreadcrumbItems()}/>
            <form onSubmit={this.handleSave}>
                {this.renderTeamInput(settings, isBusy)}
                {this.renderSecretInput(settings, isBusy)}
                <button type="submit" disabled={isBusy}>Save</button>
                {this.renderLoadingMessage(store.state)}
            </form>
        </>;
    }

    componentDidMount() {
        domWrapper.setWindowTitle('Organization settings');
        const {scmId, orgId} = this.props.match.params;
        this.getStore().loadOrgSettings(scmId, orgId);
    }

    handleSave(event: FormEvent) {
        event.preventDefault();
        const {scmId, orgId} = this.props.match.params;
        this.getStore().saveOrgSettings(scmId, orgId);
    }

    handleChange(event) {
        const {id, value} = event.target;
        this.getStore().setPartialSettings({[id]: value})
    }

    private getBreadcrumbItems() {
        const {scmId, orgId} = this.props.match.params;
        const scmName = this.context.scmStore.getById(scmId)?.name;
        const orgName = this.context.orgStore.getById(orgId)?.name;
        return [scmName || scmId,
            orgName || orgId,
            'Settings'];
    }

    private renderSecretInput(settings: OrgSettings, isBusy: boolean) {
        return <div>
            <label htmlFor="cxgoSecret">CxGo secret</label>
            <input type="text" id="cxgoSecret" value={settings.cxgoSecret}
                   maxLength={this.getStore().maxLength.cxgoSecret}
                   onChange={this.handleChange}
                   disabled={isBusy}/>
        </div>;
    }

    private renderTeamInput(settings: OrgSettings, isBusy: boolean) {
        return <div>
            <label htmlFor="team">Team</label>
            <input type="text" id="team" value={settings.team}
                   maxLength={this.getStore().maxLength.team}
                   onChange={this.handleChange}
                   disabled={isBusy}/>
        </div>;
    }

    private renderLoadingMessage(state: LoadingStateWithSave) {
        return <div>{this.loadingStateMapping[state] || ''}</div>;
    }

    private getStore() {
        return this.context.orgSettingsStore;
    }
});