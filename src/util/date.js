// @flow

import { format, distanceInWords } from 'date-fns';

export function dateTimeFormat(date) {
  return format(date, 'DD MMM YYYY HH:mm');
}

export function friendlyWords(date) {
  return distanceInWords(date, new Date(), {
    includeSeconds: true,
    addSuffix: true,
  });
}
