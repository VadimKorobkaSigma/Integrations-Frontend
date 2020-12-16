import React from 'react';
import styles from './styles.module.scss';

interface Props {
    error: string | null;
}

const ErrorComponent: React.FC<Props> = ({ error }) => {
    return error ? <h3 className={styles.message}>Error: {error}</h3> : null;
};

export default React.memo(ErrorComponent);
