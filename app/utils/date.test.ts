import { describe, test, expect } from 'vitest';
import { convertDateToLocaleString } from './date';

describe('convertDateToLocaleString', () => {
  test('converts a date to a Dutch locale string', () => {
    const date = new Date('2024-04-08T00:00:00Z');
    const result = convertDateToLocaleString(date);
    expect(result).toBe('08-04-2024');
  });

  test('converts a date to an English locale string', () => {
    const date = new Date('2024-11-09T00:00:00Z');
    const result = convertDateToLocaleString(date);
    expect(result).toBe('09-11-2024');
  });

  test('converts a date to a Papiamentu locale string', () => {
    const date = new Date('2024-12-10T00:00:00Z');
    const result = convertDateToLocaleString(date);
    expect(result).toBe('10-12-2024');
  });
});
