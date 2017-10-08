import { format } from 'date-fns';

export function dateTimeFormat(date: string | number) {
  return format(date, 'DD MMM YYYY HH:mm');
}
