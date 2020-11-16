import * as React from "react";
import {FormEvent} from "react";
import {RouteComponentProps} from "react-router-dom";
import domWrapper from "../services/domWrapper";
import MainContext from "../services/mainContext";
import {WritableLoadingState} from "../services/loadingStates";
import {observer} from "mobx-react";
import OrgSettings from "../dtos/orgSettings";

type PropType = RouteComponentProps<{
    scmId: string,
    orgId: string,
}>;

export default observer(class extends React.Component<PropType> {
    static contextType = MainContext;

    constructor(props: PropType) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        domWrapper.setWindowTitle('Organization settings');
        const {scmId, orgId} = this.props.match.params;
        this.context.orgSettingsStore.loadOrgSettings(scmId, orgId);
    }

    handleSave(event: FormEvent) {
        event.preventDefault();
        const {scmId, orgId} = this.props.match.params;
        this.context.orgSettingsStore.saveOrgSettings(scmId, orgId);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.context.orgSettingsStore.setPartialSettings({[name]: value})
    }

    render() {
        const store = this.context.orgSettingsStore;
        const isBusy = (store.state === 'loading' || store.state === 'saving');
        const settings = store.orgSettings;
        return <form onSubmit={this.handleSave}>
            <div>{this.renderTeamInput(settings, isBusy)}</div>
            <div>{this.renderSecretInput(settings, isBusy)}</div>
            <button type="submit" disabled={isBusy}>Save</button>
            {this.renderLoadingMessage(store.state)}
        </form>;
    }

    private renderSecretInput(settings: OrgSettings, isBusy: boolean) {
        return <>
            <label>CxGo secret</label>
            <input type="text" name="cxgoSecret" value={settings.cxgoSecret}
                   onChange={this.handleChange}
                   disabled={isBusy}/>
        </>;
    }

    private renderTeamInput(settings: OrgSettings, isBusy: boolean) {
        return <>
            <label htmlFor="team">Team</label>
            <input type="text" name="team" value={settings.team}
                   onChange={this.handleChange}
                   disabled={isBusy}/>
        </>;
    }

    private renderLoadingMessage(state: WritableLoadingState) {
        const mapping: { [key in WritableLoadingState]?: string } = {
            loading: 'Loading...',
            saving: 'Saving...',
            error: 'An error has occurred.'
        };
        return <div>{mapping[state] || ''}</div>;
    }
});