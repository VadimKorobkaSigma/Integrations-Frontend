import * as React from 'react';
import cn from 'classnames';
import SVG, { Props } from 'react-inlinesvg';

import styles from './styles.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    containerClassname?: string;
    containerAttributes?: React.HTMLAttributes<HTMLDivElement>;
    iconAttributes?: Props;
}

const Input: React.FC<InputProps> = ({ icon, containerAttributes, containerClassname, ...args }) => {
    return (
        <div
            {...{ ...containerAttributes }}
            className={cn(styles.container, containerClassname, containerAttributes?.className)}
        >
            <input {...{ ...args }} className={cn(icon && styles.withIcon, args.className)} />
            {icon && <SVG {...{ ...args.iconAttributes, src: icon }} />}
        </div>
    );
};

export default React.memo(Input);
