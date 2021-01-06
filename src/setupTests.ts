import 'jest-enzyme';
import * as React from 'react';
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
