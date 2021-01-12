import * as React from 'react';
import httpClient from '../httpClient';

test('httpClient', async () => {
    global.fetch = jest.fn();
    const mockedFetch: jest.Mock = global.fetch as any;
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    try {
        mockedFetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Some error' }),
            }),
        );
        await httpClient.get('https://testurl.com');
        expect(true).toBeFalsy();
    } catch (error) {
        expect(error).toMatchInlineSnapshot(`[Error: Some error]`);
    }
    try {
        mockedFetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ statusText: 'NETWORK_ERROR' }),
            }),
        );
        await httpClient.get('https://testurl.com');
        expect(true).toBeFalsy();
    } catch (error) {
        expect(error).toMatchInlineSnapshot(`[Error]`);
    }
});
