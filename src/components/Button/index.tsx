import * as React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
    children: string | JSX.Element | JSX.Element[];
    className?: string;
    type?: 'submit';
    onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

const Button: React.FC<Props> = ({ children, ...args }) => {
    return (
        <button {...{ ...args }} className={cn(styles.button, args.className)}>
            {children}
        </button>
    );
};

export default React.memo(Button);
