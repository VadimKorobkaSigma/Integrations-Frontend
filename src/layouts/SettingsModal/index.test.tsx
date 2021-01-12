import * as React from 'react';
import SettingsModal from './index';
import { mount } from 'enzyme';
import Modal from '@components/Modal';
import Button from '@components/Button';

const data = [
    { id: 'test_id', name: 'test 1', webhookEnabled: false },
    { id: 'test_id_2', name: 'test 2', webhookEnabled: true, webhookId: 1 },
];

test('SettingsModal Component', async () => {
    const setSelectedOrg = jest.fn();
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data),
        }),
    );
    jest.spyOn(React, 'useState').mockImplementation(
        jest
            .fn()
            .mockReturnValueOnce(['', jest.fn()])
            .mockReturnValueOnce(['Test secret', jest.fn()])
            .mockReturnValueOnce(['Test team', jest.fn()])
            .mockReturnValue([null, jest.fn()]),
    );
    const wrapper = mount(
        <SettingsModal selectedOrg={{ id: 'test_id', name: 'test 1' }} setSelectedOrg={setSelectedOrg} />,
    );

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(Modal).props().onClose).toBeDefined();

    wrapper.find(Modal).props().onClose();
    expect(setSelectedOrg).toBeCalledWith(null);

    wrapper.find(Modal).find('footer').find(Button).last().simulate('click');
    wrapper.find(Modal).find('textarea').first().simulate('change', 'Super secret');
    wrapper.find(Modal).find('textarea').last().simulate('change', 'Super team');
    expect(wrapper.html()).toMatchSnapshot();
});
