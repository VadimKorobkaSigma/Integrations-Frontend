import * as React from 'react';

import Card from '@components/Card';
import styles from './styles.module.scss';
import SideBar from '@layouts/SideBar';
import Repositories from '@layouts/Repositories';

const Organizations: React.FC = () => {
    const [selectedOrg, setSelectedOrg] = React.useState<string>('');

    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <SideBar selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} />
                <Repositories selectedOrg={selectedOrg} />
            </Card>
        </div>
    );
};

export default React.memo(Organizations);
