import * as React from 'react';
import Card from './index';
import { shallow } from 'enzyme';

test('Card Component only with children', () => {
    const wrapper = shallow(
        <Card>
            <p id="child-node">Test</p>
        </Card>,
    );

    expect(wrapper.find('#child-node')).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
});

test('Card Component with classname', () => {
    const wrapper = shallow(
        <Card className="test">
            <p id="child-node">Test</p>
        </Card>,
    );

    expect(wrapper.hasClass('test')).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
});
