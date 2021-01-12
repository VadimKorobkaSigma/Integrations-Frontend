import 'jest-enzyme';
import * as React from 'react';
import * as ReactAlert from 'react-alert';
const cache: { [key: string]: boolean } = {};

jest.spyOn(React, 'useEffect').mockImplementation((f: CallableFunction, deps) => {
    const key = JSON.stringify(deps);
    if (key in cache) {
        return;
    } else {
        cache[key] = true;
        f();
    }
});

jest.mock(
    'react-alert',
    jest.fn().mockImplementation(() => {
        return { useAlert: () => ({ success: jest.fn(), error: jest.fn() }) };
    }),
);
