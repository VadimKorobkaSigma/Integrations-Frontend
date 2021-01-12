import * as React from 'react';
import useError from '../useError';

test('useError', () => {
    const setError = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    jest.spyOn(React, 'useState').mockImplementation(jest.fn().mockReturnValue(['', setError]));
    const [, handleError] = useError();
    handleError('New error');
    expect(setError).toBeCalledWith('New error');
    handleError({ name: 'Name', message: 'New error' });
    expect(setError).toBeCalledWith('New error');
});
