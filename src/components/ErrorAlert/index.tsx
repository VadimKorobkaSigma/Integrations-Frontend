import React from 'react';
import cn from 'classnames';
import { AlertComponentPropsWithStyle } from 'react-alert';

import styles from './styles.module.scss';
import errorIcon from '@assets/images/error.svg';
import closeIcon from '@assets/images/close.svg';
import checkIcon from '@assets/images/check.svg';

const ErrorAlert: React.FC<AlertComponentPropsWithStyle> = ({ style, options, message, close }) => (
    <div style={style} className={cn(styles.container, styles[options.type || ''])} onClick={close}>
        {options.type === 'info' && '!'}
        {options.type === 'success' && <img src={checkIcon} alt="success icon" />}
        {options.type === 'error' && <img src={errorIcon} alt="error icon" />}
        <p>{message}</p>
        <img src={closeIcon} alt="close icon" />
    </div>
);

export default React.memo(ErrorAlert);
