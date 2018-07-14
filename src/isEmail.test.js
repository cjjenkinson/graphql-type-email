import isEmail from './isEmail';

describe('isEmail', () => {
  test('supports correct email format', () => {
    expect(isEmail('test@test.com')).toBe(true);
  });

  test('rejects invalid values', () => {
    expect(isEmail('')).toBe(false);
    expect(isEmail('this is not an email address')).toBe(false);
    expect(isEmail({})).toBe(false);
    expect(isEmail([])).toBe(false);
    expect(isEmail(123)).toBe(false);
  });
});
