import * as React from 'react';
import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { useAlert } from 'react-alert';

import { Repository } from '@dtos/repository';
import api from '@api';
import useError from '@hooks/useError';
import useSearch from '@hooks/useSearch';

import Button from '@components/Button';
import ErrorComponent from '@components/ErrorComponent';

import trashIcon from '@assets/images/trash.svg';
import scanIcon from '@assets/images/scan.svg';
import orgIcon from '@assets/images/orgIcon.svg';
import styles from './styles.module.scss';
import Search, { SearchHighlight } from '@components/Search';

interface OwnProps {
    selectedOrg: string;
}

type Props = OwnProps;

const Repositories: React.FC<Props> = ({ selectedOrg }) => {
    const alert = useAlert();
    const [error, handleError, clearError] = useError();
    const [isLoading, setIsLoading] = React.useState(false);
    const [repos, setRepos] = React.useState<Repository[]>([]);
    const [filteredRepos, searchValue, setSearchValue] = useSearch(repos, 'name');

    React.useEffect(() => {
        let isCancelled = false;
        if (selectedOrg) {
            setIsLoading(true);
            api.getOrganizationRepos(selectedOrg)
                .then((data) => {
                    if (!isCancelled) {
                        setRepos(data);
                        clearError();
                    }
                })
                .catch(handleError)
                .finally(() => setIsLoading(false));
        }

        return () => {
            isCancelled = true;
        };
    }, [selectedOrg]);

    const toggleWebhook = async (rep: Repository) => {
        try {
            let newWebhookId = '';
            if (rep.webhookEnabled) {
                await api.removeWebhook(selectedOrg, rep.id, rep.webhookId);
            } else {
                newWebhookId = await api.installWebhook(selectedOrg, rep.id).then(({ id }) => id);
            }

            const newState = !rep.webhookEnabled;

            setRepos(
                repos.map((repository) =>
                    repository.id === rep.id
                        ? { ...rep, webhookEnabled: newState, webhookId: newWebhookId }
                        : repository,
                ),
            );
            clearError();

            alert.success(newState ? 'The project was set up successfully' : 'Setup successfully removed');
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <section className={styles.column}>
            <h2 className={styles.header}>Repositories</h2>
            <ErrorComponent error={error} />
            {isLoading && <h3 className={styles.message}> Loading...</h3>}
            {!isLoading && !selectedOrg && <h3 className={styles.message}>Please select organization.</h3>}
            {!isLoading && selectedOrg && !repos.length ? (
                <h3 className={styles.message}> No repositories available.</h3>
            ) : null}
            {!isLoading && repos.length ? (
                <>
                    <Search containerClassname={styles.search} value={searchValue} onChange={setSearchValue} />
                    <ul>
                        {filteredRepos.map((rep) => (
                            <li key={rep.id} className={styles.item}>
                                <div className={styles.name}>
                                    <img src={orgIcon} alt="orgIcon" width={24} />
                                    <span>
                                        <SearchHighlight searchQuery={searchValue} text={rep.name} />
                                    </span>
                                </div>
                                <Button
                                    className={cn(styles.webhook, rep.webhookEnabled && styles.remove)}
                                    onClick={() => toggleWebhook(rep)}
                                >
                                    <SVG src={rep.webhookEnabled ? trashIcon : scanIcon} />
                                    <p>{rep.webhookEnabled ? 'Remove setup' : 'Setup project'}</p>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </section>
    );
};

export default React.memo(Repositories);
