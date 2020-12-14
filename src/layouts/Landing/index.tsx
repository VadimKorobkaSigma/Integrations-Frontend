import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import Card from '@components/Card';
import Button from '@components/Button';
import { RootAction } from '@store/rootReducer';
import * as authActions from '@store/auth/actions';
import { SupportedScm } from '@dtos/scmService';

import logoIcon from '@assets/images/logo.svg';
import azureIcon from '@assets/images/azure-flat.svg';
import githubIcon from '@assets/images/github.png';
import gitlabIcon from '@assets/images/gitlab.png';
import bitbucketIcon from '@assets/images/bitbucket.svg';

import styles from './styles.module.scss';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            loginUser: authActions.loginUser.request,
        },
        dispatch,
    );

type Props = ReturnType<typeof mapDispatchToProps>;

interface ScmItem {
    type: SupportedScm;
    label: string;
    img: string;
}

const scms: ScmItem[] = [
    {
        type: 'azure',
        label: 'Azure',
        img: azureIcon,
    },
    {
        type: 'github',
        label: 'Github',
        img: githubIcon,
    },
    {
        type: 'gitlab',
        label: 'Gitlab',
        img: gitlabIcon,
    },
    {
        type: 'bitbucket',
        label: 'Bitbucket',
        img: bitbucketIcon,
    },
];

const MascotIcon = React.lazy(() => import('@assets/images/mascot-login'));

const Landing: React.FC<Props> = ({ loginUser }) => {
    const login = (integrationType: SupportedScm) => {
        loginUser(integrationType);
    };

    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <div className={styles.buttonsContainer}>
                    <img src={logoIcon} alt="logo" className={styles.logo} />
                    <p>Log In to Checkmark Integrations</p>
                    {scms.map((scm) => (
                        <Button onClick={() => login(scm.type)} key={scm.type}>
                            <>
                                <img src={scm.img} className={styles.icon} />
                                <span>{scm.label}</span>
                            </>
                        </Button>
                    ))}
                </div>
                <React.Suspense fallback={<div style={{ width: 520, height: 560 }} />}>
                    <MascotIcon />
                </React.Suspense>
            </Card>
        </div>
    );
};

export default React.memo(connect(null, mapDispatchToProps)(Landing));
