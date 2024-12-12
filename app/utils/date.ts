export function convertDateToLocaleString(date: Date) {
  return Intl.DateTimeFormat('nl', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function convertTimeToLocaleString(date: Date) {
  return Intl.DateTimeFormat('nl', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
