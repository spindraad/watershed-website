import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { convertDateToLocaleString, convertTimeToLocaleString } from './date';

describe('convertDateToLocaleString', () => {
  beforeEach(() => {
    vi.useFakeTimers({});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('converts a date to a pretty printed string', () => {
    const date = new Date('2024-04-08T00:00:00Z');
    vi.setSystemTime(date);
    const result = convertDateToLocaleString(date);
    expect(result).toBe('08-04-2024');
  });

  test('converts a time to a pretty printed string', () => {
    const date = new Date('2024-04-08T10:30:00Z');
    const result = convertTimeToLocaleString(date);
    vi.setSystemTime(date);
    expect(result).toBe('10:30');
  });
});
