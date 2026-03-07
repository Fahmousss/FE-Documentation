import capitalizeWords from '../utils/capitalizeWords';

describe('capitalie words', () => {
  it('should capitalize words', () => {
    expect(capitalizeWords('hello every one in this room')).toBe('Hello Every One In This Room');
  });
});
