import * as React from 'react';
import '../../../__mocks__/alert.mock';
import Landing from './index';
import { shallow } from 'enzyme';

test('Landing Component', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([]) }));
    const wrapper = shallow(<Landing />, { disableLifecycleMethods: false });
    expect(wrapper.html()).toMatchSnapshot();
});
