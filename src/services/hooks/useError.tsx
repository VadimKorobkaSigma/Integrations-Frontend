import { useState } from 'react';
import { useAlert } from 'react-alert';

/**
 * # Example:
 *
 * const [error, handleError, clearError] = useError()
 */
const useError = () => {
    const alert = useAlert();
    const [error, setError] = useState('');

    const result = [
        error,
        (newError: Error | string) => {
            let prefix = '';
            try {
                prefix = JSON.stringify(new Error().stack).split('\\n')[2].slice(7); // Get component stack trace
            } catch (err) {}

            console.error(`Error in ${prefix}\n`, newError);
            const message = typeof newError === 'string' ? newError : newError.message;
            setError(message);
            alert.error(message);
        },
        () => {
            setError('');
        },
    ] as const;
    return result;
};

export default useError;
