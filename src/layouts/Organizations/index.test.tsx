import * as React from 'react';
import Organizations from './index';
import { mount } from 'enzyme';

const mockSetState = jest.fn();
jest.mock('react', () => ({
    ...(jest.requireActual('react') as typeof React),
    useState: (initial: any) => [initial, mockSetState],
}));

test('Organizations Component', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([]) }));
    const wrapper = mount(<Organizations />);
    expect(wrapper.html()).toMatchSnapshot();
});
