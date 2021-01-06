import * as React from 'react';
import ErrorComponent from './index';
import { shallow } from 'enzyme';

test('ErrorComponent Component without error', () => {
    const wrapper = shallow(<ErrorComponent error={null} />);
    expect(wrapper.html()).toMatchSnapshot();
});

test('ErrorComponent Component with error', () => {
    const wrapper = shallow(<ErrorComponent error="test" />);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.setProps({ error: null });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.setProps({ error: 'test2' });
    expect(wrapper.html()).toMatchSnapshot();
});
