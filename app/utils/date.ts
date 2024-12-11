export function convertDateToLocaleString(date: Date) {
  return Intl.DateTimeFormat('nl', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
