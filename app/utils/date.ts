export function convertDateToLocaleString(date: Date | string) {
  let dateToFormat;

  if (typeof date === 'string') {
    dateToFormat = new Date(date);
  } else {
    dateToFormat = date;
  }

  return Intl.DateTimeFormat('nl', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateToFormat);
}

export function convertTimeToLocaleString(date: Date | string) {
  let dateToFormat;

  if (typeof date === 'string') {
    dateToFormat = new Date(date);
  } else {
    dateToFormat = date;
  }

  return Intl.DateTimeFormat('nl', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateToFormat);
}

export function convertDateToLocaleStringWithShortWeekday(date: Date | string) {
  let dateObj;

  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  return Intl.DateTimeFormat('nl-NL', {
    weekday: 'short', // "wo"
    day: 'numeric', // "11"
    month: 'short', // "sept"
  }).format(dateObj);
}
