import { describe, expect, test } from 'vitest';
import { titleCase } from './text';

describe('Text utilities', () => {
  test('titleCase', () => {
    expect(titleCase('hello')).toBe('Hello');
    expect(titleCase('world')).toBe('World');
    expect(titleCase('hello world')).toBe('Hello world');
    expect(titleCase('this is the news')).toBe('This is the news');
  });
});
