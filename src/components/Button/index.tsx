import * as React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
    children: string | JSX.Element | JSX.Element[];
    className?: string;
    variant?: 'primary' | 'link';
    type?: 'submit';
    title?: string;
    onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

const Button: React.FC<Props> = ({ children, ...args }) => {
    return (
        <button {...{ ...args }} className={cn(styles.button, styles[args.variant || 'primary'], args.className)}>
            {children}
        </button>
    );
};

export default React.memo(Button);
