import * as React from 'react';

import Card from '@components/Card';
import Button from '@components/Button';
import { SupportedScm } from '@dtos/scmService';

import logoIcon from '@assets/images/logo.svg';
import azureIcon from '@assets/images/azure-flat.svg';
import githubIcon from '@assets/images/github.png';
import gitlabIcon from '@assets/images/gitlab.png';
import bitbucketIcon from '@assets/images/bitbucket.svg';

import styles from './styles.module.scss';
import api from '@services/api';
import azureService from '@services/oauth/azureService';
import gitHubService from '@services/oauth/gitHubService';
import gitLabService from '@services/oauth/gitLabService';
import bitBucketService from '@services/oauth/bitBucketService';

import useError from '@hooks/useError';
import ErrorComponent from '@components/ErrorComponent';

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

const MascotIcon = React.lazy(() => import('@components/Mascot'));

const Landing = () => {
    const [error, handleError] = useError();
    const login = async (integrationType: SupportedScm) => {
        try {
            const config = await api.getScmConfiguration(integrationType);

            let url = location.origin;
            switch (integrationType) {
                case 'azure':
                    url = azureService.generatePageUrl(config);
                    break;
                case 'github':
                    url = gitHubService.generatePageUrl(config);
                    break;
                case 'gitlab':
                    url = gitLabService.generatePageUrl(config);
                    break;
                case 'bitbucket':
                    url = bitBucketService.generatePageUrl(config);
                    break;
                default:
                    break;
            }
            window.open(url, '_self');
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <div className={styles.buttonsContainer}>
                    <img src={logoIcon} alt="logo" className={styles.logo} />
                    <p>Log In to Checkmark Integrations</p>
                    <ErrorComponent error={error} />
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

export default React.memo(Landing);
