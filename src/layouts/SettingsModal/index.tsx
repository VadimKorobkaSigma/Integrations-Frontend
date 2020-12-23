import * as React from 'react';
import { useAlert } from 'react-alert';

import api from '@services/api';
import useError from '@services/hooks/useError';
import Organization from '@dtos/organization';

import Modal from '@components/Modal';
import Button from '@components/Button';
import ErrorComponent from '@components/ErrorComponent';

import styles from './styles.module.scss';

interface OwnProps {
    selectedOrg: Organization | null;
    setSelectedOrg: React.Dispatch<React.SetStateAction<Organization | null>>;
}

type Props = OwnProps;

const SettingsModal: React.FC<Props> = ({ selectedOrg, setSelectedOrg }) => {
    const alert = useAlert();
    const [error, handleError, clearError] = useError();
    const [secret, setSecret] = React.useState('');
    const [team, setTeam] = React.useState('');

    React.useEffect(() => {
        if (selectedOrg) {
            api.getSettings(selectedOrg.id)
                .then((result) => {
                    setSecret(result.cxgoSecret);
                    setTeam(result.team);
                    clearError();
                })
                .catch(handleError);
        } else {
            setSecret('');
            setTeam('');
        }
    }, [selectedOrg]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedOrg) {
            api.setSettings(selectedOrg.id, { team, cxgoSecret: secret })
                .then(() => {
                    setSelectedOrg(null);
                    clearError();
                    alert.success('Setting updated successfuly');
                })
                .catch(handleError);
        }
    };

    return (
        <Modal
            isOpen={!!selectedOrg}
            onClose={() => setSelectedOrg(null)}
            header={`Settings of ${selectedOrg?.name} organization`}
            footer={
                <Button className={styles.submit} onClick={handleSubmit}>
                    Submit
                </Button>
            }
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <ErrorComponent error={error} />
                <label htmlFor="secret">Checkmarx Go Secret</label>
                <textarea placeholder="Secret" id="secret" value={secret} onChange={(e) => setSecret(e.target.value)} />
                <label htmlFor="team">Team</label>
                <textarea placeholder="Team" id="team" value={team} onChange={(e) => setTeam(e.target.value)} />
            </form>
        </Modal>
    );
};

export default React.memo(SettingsModal);
