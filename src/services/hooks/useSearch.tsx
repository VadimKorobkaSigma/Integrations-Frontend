import { useEffect, useState } from 'react';
import useInput from './useInput';

/**
 * # Example:
 *
 * const [filteredOrgs, searchValue, setSearchValue] = useSearch(organizations, 'name');
 *
 * # Validation:
 *
 * useSearch([{ a: '1', b: 2 }], 'a'); // Correct
 *
 * useSearch([{ a: '1', b: 2 }], 'b'); // Error
 *
 * useSearch([{ a: '1', b: 2 }], 'c'); // Error
 */
const useSearch = <T, K extends keyof T>(originList: Array<T[K] extends string ? T : never>, comporator: K) => {
    const [searchValue, setSearchValue] = useInput('');
    const [filteredList, setFilteredList] = useState<T[]>(originList);

    useEffect(() => {
        const result = originList.filter((item) =>
            String(item[comporator]).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        );
        setFilteredList(result);
    }, [searchValue, originList]);

    return [filteredList, searchValue, setSearchValue] as const;
};

export default useSearch;
