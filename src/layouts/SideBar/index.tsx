import * as React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import logoIcon from '@assets/images/logo.png';
import settingsIcon from '@assets/images/threeDots.svg';
import orgIcon from '@assets/images/orgIcon.svg';
import { RootState } from '@store/rootReducer';
import styles from './styles.module.scss';

const mapStateToProps = (state: RootState) => ({
    organizations: state.orgs.organizations,
    error: state.orgs.error,
});

interface OwnProps {
    selectedOrg: string;
    setSelectedOrg: React.Dispatch<React.SetStateAction<string>>;
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const SideBar: React.FC<Props> = ({ organizations, error, selectedOrg, setSelectedOrg }) => {
    return (
        <section className={cn(styles.column, styles.sidebar)}>
            <div className={styles.header}>
                <img src={logoIcon} alt="logo" />
                <h2>Organizations</h2>
            </div>
            {error && <h3>Error: {error}</h3>}
            <ul>
                {organizations.map((org) => (
                    <li
                        key={org.id}
                        onClick={() => setSelectedOrg(org.id)}
                        className={cn(styles.item, selectedOrg === org.id && styles.active)}
                    >
                        <img src={orgIcon} alt="orgIcon" width={24} />
                        <span>{org.name}</span>
                        <img src={settingsIcon} alt="settingsIcon" className={styles.settings} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default React.memo(connect(mapStateToProps)(SideBar));
