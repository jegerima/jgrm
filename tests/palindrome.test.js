const palindrome = require('../utils/helpers').palindrome;

test('palindrome of jegerima', function() {
  const result = palindrome('jegerima');

  expect(result).toBe('amiregej');
});

test('palindrome of empty string', function() {
  const result = palindrome('');
  expect(result).toBe('');
});

test('palindrome of undefined', function() {
  const result = palindrome();

  expect(result).toBeUndefined();
});
