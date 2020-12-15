import * as React from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import Button from '@components/Button';
import api from '@services/api';

interface OwnProps {
    selectedOrg: string;
    setSelectedOrg: React.Dispatch<React.SetStateAction<string>>;
}

type Props = OwnProps;

const SettingsModal: React.FC<Props> = ({ selectedOrg, setSelectedOrg }) => {
    const [secret, setSecret] = React.useState('');
    const [team, setTeam] = React.useState('');

    React.useEffect(() => {
        if (selectedOrg) {
            api.getSettings(selectedOrg).then(({ team, cxgoSecret }) => {
                setSecret(cxgoSecret);
                setTeam(team);
            });
        } else {
            setSecret('');
            setTeam('');
        }
    }, [selectedOrg]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api.setSettings(selectedOrg, { team, cxgoSecret: secret }).then(() => {
            setSelectedOrg('');
        });
    };

    return (
        <Modal isOpen={!!selectedOrg} onRequestClose={() => setSelectedOrg('')} className={styles.modal}>
            <form onSubmit={handleSubmit}>
                <h1>Settings</h1>
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
