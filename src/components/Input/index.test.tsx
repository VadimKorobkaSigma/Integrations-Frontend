import * as React from 'react';
import Input from './index';
import { shallow } from 'enzyme';

test('Input Component without error', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Input onChange={onChange} />);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.find('input').simulate('change', 'New value');
    expect(onChange).toHaveBeenCalledWith('New value');
    wrapper.setProps({ containerAttributes: { className: 'testClass' } });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.setProps({ icon: 'testIcon' });
    expect(wrapper.html()).toMatchSnapshot();
});
