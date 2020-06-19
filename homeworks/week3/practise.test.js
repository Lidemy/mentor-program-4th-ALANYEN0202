const meth = require('./practise');

test('abc => cba', () => {
  expect(meth.re('abc')).toBe('cba');
});
test('空字串', () => {
  expect(meth.re('')).toBe('');
});
test('aabcc => ccbaa', () => {
  expect(meth.re('aabcc')).toBe('ccbaa');
});
