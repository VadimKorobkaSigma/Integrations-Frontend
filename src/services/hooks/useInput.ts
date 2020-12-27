import { useState } from 'react';

/**
 * # Example:
 *
 * const [value, setValue] = useInput()
 */
const useInput = (defaultValue?: string) => {
    const [value, setValue] = useState(defaultValue || '');

    return [
        value,
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(event.target.value);
        },
    ] as const;
};

export default useInput;
