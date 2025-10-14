import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  convertDateToLocaleString,
  convertDateToLocaleStringWithShortWeekday,
  convertTimeToLocaleString,
} from './date';

describe('convertDateToLocaleString', () => {
  beforeEach(() => {
    vi.useFakeTimers({});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('converts a date to a pretty printed string', () => {
    const dateString = '2024-04-08T00:00:00Z';
    const date = new Date(dateString);
    vi.setSystemTime(date);

    const stringResult = convertDateToLocaleString(dateString);
    expect(stringResult).toBe('08-04-2024');

    const dateResult = convertDateToLocaleString(date);
    expect(dateResult).toBe('08-04-2024');
  });

  test('converts a time to a pretty printed string', () => {
    const dateString = '2024-04-08T10:30:00Z';
    const date = new Date(dateString);
    vi.setSystemTime(date);

    const stringResult = convertTimeToLocaleString(dateString);
    expect(stringResult).toBe('10:30');

    const dateResult = convertTimeToLocaleString(date);
    expect(dateResult).toBe('10:30');
  });

  test('converts a date to a human readable format with shortened weekday', () => {
    const dateString = '2024-04-08T00:00:00Z';
    const date = new Date(dateString);
    vi.setSystemTime(date);

    const stringResult = convertDateToLocaleStringWithShortWeekday(dateString);
    expect(stringResult).toBe('ma 8 apr');

    const dateResult = convertDateToLocaleStringWithShortWeekday(date);
    expect(dateResult).toBe('ma 8 apr');
  });
});
