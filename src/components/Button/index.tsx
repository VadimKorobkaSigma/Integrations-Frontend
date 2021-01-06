import * as React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'link';
}

const Button: React.FC<Props> = ({ children, ...args }) => {
    return (
        <button {...args} className={cn(styles.button, styles[args.variant || 'primary'], args.className)}>
            {children}
        </button>
    );
};

export default React.memo(Button);
