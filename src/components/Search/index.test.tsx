import * as React from 'react';
import Search, { SearchHighlight } from './index';
import { shallow } from 'enzyme';

test('Search Component without error', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.html()).toMatchSnapshot();
});

test('SearchHighlight Component without error', () => {
    const wrapper = shallow(<SearchHighlight text="Test name" searchQuery="Test" />);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.setProps({ searchQuery: '' });
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.setProps({ text: '', searchQuery: 'Test' });
    expect(wrapper.html()).toMatchSnapshot();
});
