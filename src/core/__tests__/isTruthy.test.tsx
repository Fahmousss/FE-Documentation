import { isTruthy } from '../utils/isTruthy';

describe('isTruthy', () => {
  it('should return true if value is truthy', () => {
    expect(isTruthy('hello')).toBe(true);
    expect(isTruthy('1')).toBe(true);
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
    expect(isTruthy('0 ')).toBe(false);
  });
});
