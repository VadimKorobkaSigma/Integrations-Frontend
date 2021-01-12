import * as React from 'react';
import SideBar from './index';
import SVG from 'react-inlinesvg';
import { shallow } from 'enzyme';
import OrgSettings from '@dtos/orgSettings';

const data = [
    { id: 'test_id', name: 'test 1' },
    { id: 'test_id_2', name: 'test 2' },
];

test('SideBar Component', () => {
    const selectedOrg = 'test_id_2';
    const setSelectedOrg = jest.fn();
    const setSettingsForOrg = jest.fn();
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ cxgoToken: 'cxgoToken', team: 'team' } as OrgSettings),
        }),
    );
    jest.spyOn(React, 'useState').mockImplementation(
        jest
            .fn()
            .mockReturnValueOnce([selectedOrg, setSettingsForOrg])
            .mockReturnValueOnce(['', jest.fn()])
            .mockReturnValueOnce([data, jest.fn()])
            .mockReturnValue([null, jest.fn()]),
    );

    const wrapper = shallow(
        <SideBar
            organizations={data}
            selectedOrg={selectedOrg}
            error=""
            isLoading={false}
            setSelectedOrg={setSelectedOrg}
        />,
    );
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.find(SVG).last().simulate('click', new MouseEvent('click'));
    wrapper.find('li').last().simulate('click', new MouseEvent('click'));
});

test('SideBar Component', () => {
    const selectedOrg = 'test_id_2';
    const setSelectedOrg = jest.fn();
    const setSettingsForOrg = jest.fn();
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ cxgoToken: 'cxgoToken', team: 'team' } as OrgSettings),
        }),
    );
    jest.spyOn(React, 'useState').mockImplementation(
        jest
            .fn()
            .mockReturnValueOnce([selectedOrg, setSettingsForOrg])
            .mockReturnValueOnce(['', jest.fn()])
            .mockReturnValueOnce([data, jest.fn()])
            .mockReturnValue([null, jest.fn()]),
    );

    const wrapper = shallow(
        <SideBar organizations={[]} selectedOrg={''} error="" isLoading={true} setSelectedOrg={setSelectedOrg} />,
    );
    expect(wrapper.html()).toMatchSnapshot();
});
