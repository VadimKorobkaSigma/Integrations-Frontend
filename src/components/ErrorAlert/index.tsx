import React from 'react';
import { AlertComponentPropsWithStyle } from 'react-alert';

import styles from './styles.module.scss';
import errorIcon from '@assets/images/error.svg';
import closeIcon from '@assets/images/close.svg';

const ErrorAlert: React.FC<AlertComponentPropsWithStyle> = ({ style, options, message, close }) => (
    <div style={style} className={styles.container} onClick={close}>
        {options.type === 'info' && '!'}
        {options.type === 'success' && ':)'}
        {options.type === 'error' && <img src={errorIcon} alt="error icon" />}
        <p>{message}</p>
        <img src={closeIcon} alt="error icon" />
    </div>
);

export default React.memo(ErrorAlert);
