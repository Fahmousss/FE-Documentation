import * as utils from '../utils/global.utils';

const { insertFormData, checkIncludes, createUrlWithQueryParams } = utils;

describe('insertFormData', () => {
  it('should convert an object to FormData', () => {
    const object = { name: 'John', age: 30 };
    const formData = insertFormData(object as any);

    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get('name')).toBe('John');
    expect(formData.get('age')).toBe('30'); // FormData converts numbers to strings
  });

  it('should ignore null and undefined values', () => {
    const object = { name: 'John', age: null, status: undefined };
    const formData = insertFormData(object as any);

    expect(formData.has('name')).toBe(true);
    expect(formData.has('age')).toBe(false);
    expect(formData.has('status')).toBe(false);
  });

  it('should handle boolean values correctly', () => {
    const object = { active: true, verified: false };
    const formData = insertFormData(object as any);

    expect(formData.get('active')).toBe('true');
    expect(formData.get('verified')).toBe(null);
  });

  it('should handle array values correctly', () => {
    const object = { tags: ['tag1', 'tag2', 'tag3'] };
    const formData = insertFormData(object as any);

    expect(formData.get('tags')).toBe('tag1,tag2,tag3'); // By default, array values are converted to a comma-separated string
  });

  it('should handle File objects correctly', () => {
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
    const object = { file };
    const formData = insertFormData(object as any);

    expect(formData.get('file')).toBe(file);
  });

  it('should return an empty FormData if the object is empty', () => {
    const formData = insertFormData({});
    expect([...formData.keys()].length).toBe(0);
  });

  it('should handle nested objects (if needed)', () => {
    const object = { user: { name: 'John', age: 30 } };
    const formData = insertFormData(object as any);

    // Optional: Depending on how you want to handle nested objects
    expect(formData.has('user')).toBe(true);
    expect(formData.get('user')).toBe('[object Object]');
  });
});

describe('createUrlWithQueryParams', () => {
  it('should create a URL with query parameters', () => {
    const result = createUrlWithQueryParams('/api/data', {
      name: 'John',
      age: 30,
    });
    expect(result).toBe('/api/data?name=John&age=30');
  });

  it('should handle null and undefined values by ignoring them', () => {
    const result = createUrlWithQueryParams('/api/data', {
      name: 'John',
      age: null,
      status: undefined,
    });
    expect(result).toBe('/api/data?name=John');
  });

  it('should handle boolean values correctly', () => {
    const result = createUrlWithQueryParams('/api/data', {
      active: true,
      verified: false,
    });
    expect(result).toBe('/api/data?active=true&verified=false');
  });

  it('should handle number values correctly', () => {
    const result = createUrlWithQueryParams('/api/data', {
      id: 123,
      count: 0,
    });
    expect(result).toBe('/api/data?id=123&count=0');
  });

  it('should handle array values by converting them to comma-separated strings', () => {
    const result = createUrlWithQueryParams('/api/data', {
      tags: ['tag1', 'tag2', 'tag3'],
    });
    expect(result).toBe('/api/data?tags=tag1%2Ctag2%2Ctag3');
  });

  it('should return the path if no valid query parameters are provided', () => {
    const result = createUrlWithQueryParams('/api/data', {
      name: undefined,
      age: null,
    });
    expect(result).toBe('/api/data?');
  });

  it('should handle an empty object as queryParams', () => {
    const result = createUrlWithQueryParams('/api/data', {});
    expect(result).toBe('/api/data?');
  });
});

describe('checkIncludes', () => {
  test('returns true if all elements in referenceArr are included in arr', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const referenceArr = ['a', 'c'];
    expect(checkIncludes(arr, referenceArr)).toBe(true);
  });

  test('returns false if any element in referenceArr is not included in arr', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const referenceArr = ['a', 'e'];
    expect(checkIncludes(arr, referenceArr)).toBe(false);
  });

  test('returns true if referenceArr is empty', () => {
    const arr = ['a', 'b', 'c'];
    const referenceArr: string[] = [];
    expect(checkIncludes(arr, referenceArr)).toBe(true);
  });

  test('returns false if arr is empty and referenceArr is not empty', () => {
    const arr: string[] = [];
    const referenceArr = ['a'];
    expect(checkIncludes(arr, referenceArr)).toBe(false);
  });

  test('returns true if both arr and referenceArr are empty', () => {
    const arr: string[] = [];
    const referenceArr: string[] = [];
    expect(checkIncludes(arr, referenceArr)).toBe(true);
  });
});
