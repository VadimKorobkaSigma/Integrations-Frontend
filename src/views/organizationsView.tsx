import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import MainContext from '@services/mainContext';
import { OauthExtendedLoadingState } from '@services/loadingStates';
import OrganizationList from '@components/organizationList';
import domWrapper from '@services/domWrapper';
import { PropsWithScmId } from '@components/mainRoutes';

export default observer(
    class Organizations extends React.Component<PropsWithScmId> {
        static contextType = MainContext;

        componentDidMount() {
            domWrapper.setWindowTitle('Organizations');
            const { scmId } = this.props.match.params;
            const query = domWrapper.getCurrentQuery();
            const authCode = query.get('code');
            const state = query.get('state');
            this.context.orgStore.loadOrganizationsByScm(scmId, authCode, state);
        }

        render() {
            return (
                <div>
                    {this.renderHeader()}
                    <h3>Organizations</h3>
                    {this.renderOrgs()}
                </div>
            );
        }

        private renderHeader() {
            const { scmStore } = this.context;
            const { scmId } = this.props.match.params;
            const scm = scmStore.getById(scmId);
            return scm && scm.name ? <h2>{scm.name}</h2> : '';
        }

        renderOrgs() {
            let result;
            const { organizations, state } = this.context.orgStore;
            if (state === 'completed') {
                result = <OrganizationList organizations={organizations} baseUrl={this.props.match.url} />;
            } else {
                result = Organizations.renderLoadingMessage(state);
            }
            return result;
        }

        static renderLoadingMessage(state: OauthExtendedLoadingState) {
            let result;
            switch (state) {
                case 'loading':
                    result = <div>Loading...</div>;
                    break;
                case 'invalidOAuthState':
                    result = (
                        <div>
                            Invalid OAuth state. You can try again from <Link to={'/'}>here</Link>.
                        </div>
                    );
                    break;
                case 'error':
                    result = (
                        <div>
                            An error has occurred. You can try again from <Link to={'/'}>here</Link>
                        </div>
                    );
                    break;
                default:
                    result = '';
            }
            return result;
        }
    },
);
