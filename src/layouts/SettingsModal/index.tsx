import * as React from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import Button from '@components/Button';
import api from '@services/api';
import useError from '@services/hooks/useError';
import Organization from '@dtos/organization';
import ErrorComponent from '@components/ErrorComponent';

Modal.setAppElement('#react');

interface OwnProps {
    selectedOrg: Organization | null;
    setSelectedOrg: React.Dispatch<React.SetStateAction<Organization | null>>;
}

type Props = OwnProps;

const SettingsModal: React.FC<Props> = ({ selectedOrg, setSelectedOrg }) => {
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
                })
                .catch(handleError);
        }
    };

    return (
        <Modal isOpen={!!selectedOrg} onRequestClose={() => setSelectedOrg(null)} className={styles.modal}>
            <form onSubmit={handleSubmit}>
                <h1>Settings of {selectedOrg?.name} organization</h1>
                <ErrorComponent error={error} />
                <label htmlFor="secret">Checkmarx Go Secret</label>
                <textarea placeholder="Secret" id="secret" value={secret} onChange={(e) => setSecret(e.target.value)} />
                <label htmlFor="team">Team</label>
                <textarea placeholder="Team" id="team" value={team} onChange={(e) => setTeam(e.target.value)} />
                <Button className={styles.submit} type="submit">
                    Submit
                </Button>
            </form>
        </Modal>
    );
};

export default React.memo(SettingsModal);
