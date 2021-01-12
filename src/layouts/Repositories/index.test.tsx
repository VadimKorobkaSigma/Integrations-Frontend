import * as React from 'react';
import Repositories from './index';
import { shallow } from 'enzyme';
import Button from '@components/Button';
const data = [
    { id: 'test_id', name: 'test 1', webhookEnabled: false },
    { id: 'test_id_2', name: 'test 2', webhookEnabled: true, webhookId: 1 },
];
test('Repositories Component', () => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }),
    );
    jest.spyOn(React, 'useState').mockImplementation(
        jest
            .fn()
            .mockReturnValueOnce(['', jest.fn()])
            .mockReturnValueOnce([false, jest.fn()])
            .mockReturnValueOnce([data, jest.fn()])
            .mockReturnValueOnce(['', jest.fn()])
            .mockReturnValueOnce([data, jest.fn()])
            .mockReturnValue([null, jest.fn()]),
    );
    const wrapper = shallow(<Repositories selectedOrg="test_id" />);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.find(Button).first().simulate('click');
});
