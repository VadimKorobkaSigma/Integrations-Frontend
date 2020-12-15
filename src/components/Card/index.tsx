import * as React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
    return <div className={cn(styles.card, className)}>{children}</div>;
};

export default React.memo(Card);
