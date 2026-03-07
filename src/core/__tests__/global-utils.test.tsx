import * as utils from '../utils/global-utils';

describe('Global Utils Test', () => {
  it('Should return capitalize every word from given string', () => {
    expect(utils.capitalizeEveryWord('hello world')).toBe('Hello World');
    expect(utils.capitalizeEveryWord('bambietta')).toBe('Bambietta');
    expect(utils.capitalizeEveryWord('')).toBe('');
  });

  it('Should return a capitalize word from given string', () => {
    expect(utils.capitalize('hello world')).toBe('Hello world');
    expect(utils.capitalize('')).toBe('');
  });

  it('Should return add space in between camelCase string and lowercase', () => {
    expect(utils.addSpace('helloEveryOneInThisRoom')).toBe('hello every one in this room');
    expect(utils.addSpace('')).toBe('');
  });

  it("Should return add space in between '-' separator", () => {
    expect(utils.addSpaceSeparator('hello-every-one-in-this-room')).toBe(
      'hello every one in this room',
    );
    expect(utils.addSpaceSeparator('')).toBe('');
  });

  it('Should return remove space or underscore between string and lower case every word', () => {
    expect(utils.removeSpaceAndLower('hello_every_one_in_this_room')).toBe(
      'helloeveryoneinthisroom',
    );
    expect(utils.removeSpaceAndLower('hello every one in this room')).toBe(
      'helloeveryoneinthisroom',
    );
    expect(utils.removeSpaceAndLower('Hello every oNe in this roOm')).toBe(
      'helloeveryoneinthisroom',
    );
    expect(utils.removeSpaceAndLower('')).toBe('');
  });

  it('Should remove kebab case and make it capital', () => {
    expect(utils.removeKebabCaseCapital('hello-every-one-in-this-room')).toBe(
      'Hello Every One In This Room',
    );
    expect(utils.removeKebabCaseCapital('')).toBe('');
  });

  it('Should return rounding number', () => {
    expect(utils.roundingNumber(1.23456)).toBe(1);
    expect(utils.roundingNumber(1.678)).toBe(2);
  });

  it('Should return formatted value with unit', () => {
    expect(utils.formatValueWithUnit('10 kg')).toBe('10 kg');
    expect(utils.formatValueWithUnit('10')).toBe('10');
    expect(utils.formatValueWithUnit('oko kg')).toBe('0 kg');
  });
});
