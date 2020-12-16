import { useState } from 'react';

/**
 * Example:
 *
 * const [value, setValue] = useInput()
 */
const useInput = (defaultValue?: string) => {
    const [value, setValue] = useState(defaultValue || '');

    const result: Readonly<[string, (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void]> = [
        value,
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(event.target.value);
        },
    ];
    return result;
};

export default useInput;
