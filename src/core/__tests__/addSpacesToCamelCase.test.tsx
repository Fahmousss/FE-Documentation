import { addSpacesToCamelCase } from '../utils/addSpacesToCamelCase';

describe('addSpacesToCamelCase', () => {
  it('should add spaces to camelCase string', () => {
    expect(addSpacesToCamelCase('helloEveryOneInThisRoom')).toBe('hello Every One In This Room');
  });
});
