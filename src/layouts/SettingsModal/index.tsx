import * as React from 'react';
import Modal from 'react-modal';
import cn from 'classnames';

import settingsIcon from '@assets/images/settings.svg';
import orgIcon from '@assets/images/orgIcon.svg';
import { RootState } from '@store/rootReducer';
import styles from './styles.module.scss';

interface OwnProps {
    selectedOrg: string;
    setSelectedOrg: React.Dispatch<React.SetStateAction<string>>;
}

type Props = OwnProps;

const SettingsModal: React.FC<Props> = ({ selectedOrg, setSelectedOrg }) => {
    return (
        <Modal isOpen={!!selectedOrg} onRequestClose={() => setSelectedOrg('')}>
            <textarea placeholder="Name" />
            <textarea placeholder="Name" />
        </Modal>
    );
};

export default React.memo(SettingsModal);
