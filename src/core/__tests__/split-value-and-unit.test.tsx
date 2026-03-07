import { splitValueAndUnit } from '../utils/splitValueAndUnit';

describe('splitValueAndUnit', () => {
  it('should return an empty number and unit for an empty string', () => {
    expect(splitValueAndUnit('')).toEqual({ number: '', unit: '' });
  });

  it('should split a string with a number and unit', () => {
    expect(splitValueAndUnit('10 kg')).toEqual({ number: '10', unit: 'kg' });
  });

  it('should return the number and an empty unit if no unit is provided', () => {
    expect(splitValueAndUnit('10')).toEqual({ number: '10', unit: '' });
  });

  it('should return an empty number and unit if there is extra space', () => {
    expect(splitValueAndUnit('  ')).toEqual({ number: '', unit: '' });
  });

  it('should handle cases with more than one space between number and unit', () => {
    expect(splitValueAndUnit('10    kg')).toEqual({ number: '10', unit: 'kg' });
  });

  it('should handle a value with more than two parts', () => {
    expect(splitValueAndUnit('10 kg')).toEqual({ number: '10', unit: 'kg' });
  });
});
