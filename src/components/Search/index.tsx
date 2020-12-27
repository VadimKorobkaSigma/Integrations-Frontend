import React from 'react';
import cn from 'classnames';

import { normalizeString } from '@services/utils';
import Input, { InputProps } from '@components/Input';
import searchIcon from '@assets/images/search.svg';
import styles from './styles.module.scss';

interface HighlightProps {
    searchQuery: string;
    text: string;
}

export const SearchHighlight: React.FC<HighlightProps> = React.memo(({ searchQuery, text }) => {
    if (!searchQuery) {
        return <span>{text}</span>;
    }

    const highlight = normalizeString(searchQuery);
    const parts = highlight.length ? text.split(new RegExp(`(${highlight})`, 'gi')) : [text];
    return (
        <span>
            {parts.map((part, i) => (
                <span
                    key={i}
                    className={cn({
                        [styles.highlighted]: normalizeString(part.toLowerCase()) === highlight.toLowerCase(),
                    })}
                >
                    {part}
                </span>
            ))}
        </span>
    );
});

SearchHighlight.displayName = 'Search.Highlight';

const Search: React.FC<InputProps> = (props) => {
    return <Input icon={searchIcon} placeholder="Search" {...{ ...props }} />;
};

export default React.memo(Search);
