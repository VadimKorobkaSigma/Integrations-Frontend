import * as React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { RootState } from '@store/rootReducer';
import { Repository } from '@dtos/repository';

import orgIcon from '@assets/images/orgIcon.svg';
import styles from './styles.module.scss';
import api from '@services/api';
import Button from '@components/Button';

interface OwnProps {
    selectedOrg: string;
}

type Props = OwnProps;

const SideBar: React.FC<Props> = ({ selectedOrg }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [repos, setRepos] = React.useState<Repository[]>([]);

    React.useEffect(() => {
        setIsLoading(true);
        api.getOrganizationRepos(selectedOrg)
            .then(setRepos)
            .finally(() => setIsLoading(false));
    }, [selectedOrg]);

    const toggleWebhook = (rep: Repository) => {
        console.log('toggleWebhook ~ rep', rep);
        if (rep.webhookEnabled) {
            api.removeWebhook(selectedOrg, rep.id, rep.webhookId).then(() => {
                setRepos(
                    repos.map((repository) =>
                        repository.id === rep.id ? { ...rep, webhookEnabled: false } : repository,
                    ),
                );
            });
        } else {
            api.installWebhook(selectedOrg, rep.id).then((webhookId) => {
                setRepos(
                    repos.map((repository) =>
                        repository.id === rep.id ? { ...rep, webhookEnabled: true, webhookId } : repository,
                    ),
                );
            });
        }
    };

    return (
        <section className={styles.column}>
            <h2>Repositories</h2>
            {isLoading && <h3> Loading...</h3>}
            {!isLoading && !selectedOrg && <h3>Please select organization.</h3>}
            {!isLoading && selectedOrg && !repos.length ? <h3> No repositories available.</h3> : null}
            {!isLoading && repos.length ? (
                <ul>
                    {repos.map((rep) => (
                        <li key={rep.id} className={styles.item}>
                            <div className={styles.name}>
                                <img src={orgIcon} alt="orgIcon" width={24} />
                                <span>{rep.name}</span>
                            </div>
                            <Button className={styles.webhook} onClick={() => toggleWebhook(rep)}>
                                {rep.webhookEnabled ? 'Remove webhook' : 'Setup webhook'}
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </section>
    );
};

export default React.memo(SideBar);
