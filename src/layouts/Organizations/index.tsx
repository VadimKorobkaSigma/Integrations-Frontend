import * as React from 'react';

import Card from '@components/Card';
import styles from './styles.module.scss';
import SideBar from '@layouts/SideBar';
import Repositories from '@layouts/Repositories';
import api from '@api';
import Organization from '@dtos/organization';
import useError from '@hooks/useError';

const Organizations: React.FC = () => {
    const [error, handleError, clearError] = useError();
    const [selectedOrg, setSelectedOrg] = React.useState<string>('');
    const [organizations, setOrganizations] = React.useState<Organization[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        api.getOrganizations()
            .then((orgs) => {
                setOrganizations(orgs);
                clearError();
            })
            .catch(handleError)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <SideBar
                    error={error}
                    isLoading={isLoading}
                    organizations={organizations}
                    selectedOrg={selectedOrg}
                    setSelectedOrg={setSelectedOrg}
                />
                <Repositories selectedOrg={selectedOrg} />
            </Card>
        </div>
    );
};

export default React.memo(Organizations);
