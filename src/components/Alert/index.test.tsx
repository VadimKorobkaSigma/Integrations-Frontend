/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Alert from './index';
import { shallow } from 'enzyme';

test('Alert Component with children', () => {
    const props = {
        options: {
            type: '',
        },
        message: 'Test message',
        close: jest.fn(),
    } as any;
    const wrapper = shallow(<Alert {...props}>Submit</Alert>);
    expect(wrapper.html()).toMatchSnapshot();

    for (const type of ['success', 'info', 'error']) {
        props.options.type = type;
        wrapper.setProps({ ...props, options: { ...props.options } });
        expect(wrapper.html()).toMatchSnapshot();
    }

    wrapper.find('div').simulate('click');
    expect(props.close).toBeCalledTimes(1);
});
