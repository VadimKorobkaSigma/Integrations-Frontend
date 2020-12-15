import * as React from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

import settingsIcon from '@assets/images/settings.svg';
import orgIcon from '@assets/images/orgIcon.svg';
import { RootState } from '@store/rootReducer';
import styles from './styles.module.scss';
import Button from '@components/Button';

interface OwnProps {
    selectedOrg: string;
    setSelectedOrg: React.Dispatch<React.SetStateAction<string>>;
}

type Props = OwnProps;

const SettingsModal: React.FC<Props> = ({ selectedOrg, setSelectedOrg }) => {
    return (
        <Modal isOpen={!!selectedOrg} onRequestClose={() => setSelectedOrg('')} className={styles.modal}>
            <h1>Settings</h1>
            <label htmlFor="secret">Checkmarx Go Secret</label>
            <textarea placeholder="Secret" id="secret" />
            <label htmlFor="team">Team</label>
            <textarea placeholder="Team" id="team" />
            <Button className={styles.submit}>Submit</Button>
        </Modal>
    );
};

export default React.memo(SettingsModal);
