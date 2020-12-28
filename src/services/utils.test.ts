import { parseQuery, normalizeString } from './utils';

test('Services -> parseQuery', () => {
    expect(parseQuery('')).toMatchSnapshot();
    expect(parseQuery('?a=2')).toMatchSnapshot();
    expect(parseQuery('?a=2&b=3&c')).toMatchSnapshot();
    expect(parseQuery('a=2&b=3&c')).toMatchSnapshot();
});

test('Services -> normalizeString', () => {
    expect(normalizeString('1abc23-+l')).toMatchSnapshot();
    expect(normalizeString('?a=2')).toMatchSnapshot();
    expect(normalizeString('?a=2&b=3&c')).toMatchSnapshot();
    expect(normalizeString('a=@2&b=3/*!&c')).toMatchSnapshot();
});
