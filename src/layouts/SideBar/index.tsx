import * as React from 'react';
import cn from 'classnames';

import logoIcon from '@assets/images/logo.png';
import settingsIcon from '@assets/images/threeDots.svg';
import orgIcon from '@assets/images/orgIcon.svg';
import styles from './styles.module.scss';
import SettingsModal from '@layouts/SettingsModal';
import Organization from '@dtos/organization';
import ErrorComponent from '@components/ErrorComponent';

interface Props {
    organizations: Organization[];
    selectedOrg: string;
    error: string;
    isLoading: boolean;
    setSelectedOrg: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar: React.FC<Props> = ({ error, organizations, selectedOrg, setSelectedOrg, isLoading }) => {
    const [settingsForOrg, setSettingsForOrg] = React.useState<Organization | null>(null);

    const selectOrg = (e: React.MouseEvent<HTMLLIElement>) => {
        if (e.target instanceof Element) {
            const id = e.target.getAttribute('data-name') || e.target.parentElement?.getAttribute('data-name');
            if (id) {
                setSelectedOrg(id);
            }
        }
    };

    const openSettings = (e: React.MouseEvent<HTMLImageElement>, org: Organization) => {
        e.stopPropagation();
        setSettingsForOrg(org);
    };

    return (
        <section className={cn(styles.column, styles.sidebar)}>
            <div className={styles.header}>
                <img src={logoIcon} alt="logo" />
                <h2>Organizations</h2>
            </div>
            <ErrorComponent error={error} />
            {isLoading && <h3>Loading...</h3>}
            <ul>
                {organizations.map((org) => (
                    <li
                        key={org.id}
                        data-name={org.id}
                        onClick={selectOrg}
                        className={cn(styles.item, selectedOrg === org.id && styles.active)}
                    >
                        <img src={orgIcon} alt="orgIcon" width={24} />
                        <span>{org.name}</span>
                        <img
                            src={settingsIcon}
                            data-name={org.id}
                            alt="settingsIcon"
                            className={styles.settings}
                            onClick={(e) => openSettings(e, org)}
                        />
                    </li>
                ))}
            </ul>
            <SettingsModal selectedOrg={settingsForOrg} setSelectedOrg={setSettingsForOrg} />
        </section>
    );
};

export default React.memo(SideBar);
