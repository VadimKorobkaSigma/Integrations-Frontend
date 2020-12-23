import * as React from 'react';
import cn from 'classnames';

import styles from './style.module.scss';
import Button from '@components/Button';

interface Props {
    isOpen: boolean;
    header?: string | React.ReactElement;
    footer?: string | React.ReactElement;
    onClose: VoidFunction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any> | React.ReactNodeArray;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose, header, footer }) => {
    return (
        <div className={cn(styles.modal, isOpen && styles.open)}>
            <div className={styles.backdrop} onClick={onClose} />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>{header}</h1>
                </header>
                {children}
                {footer && (
                    <footer className={styles.footer}>
                        <Button variant="link" onClick={onClose}>
                            Cancel
                        </Button>
                        {footer}
                    </footer>
                )}
            </div>
        </div>
    );
};

export default React.memo(Modal);
