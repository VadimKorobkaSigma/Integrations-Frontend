import * as React from 'react';
import Button from './index';
import { shallow } from 'enzyme';

test('Button Component with children', () => {
    const wrapper = shallow(<Button>Submit</Button>);
    expect(wrapper.html()).toMatchSnapshot();
    const onClick = jest.fn();
    wrapper.setProps({ onClick });
    wrapper.find('button').simulate('click');
    expect(onClick).toBeCalledTimes(1);
});
