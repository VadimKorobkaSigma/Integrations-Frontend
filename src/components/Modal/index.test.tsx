import * as React from 'react';
import Modal from './index';
import { shallow } from 'enzyme';

test('Modal Component', () => {
    const wrapper = shallow(
        <Modal
            isOpen={true}
            onClose={() => {
                wrapper.setProps({ isOpen: false });
            }}
            footer={<footer>Footer</footer>}
        >
            <p>1</p>
        </Modal>,
    );
    expect(wrapper.html()).toMatchSnapshot();
});
