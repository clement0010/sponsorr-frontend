import dayjs from 'dayjs';

/**
 * Generate date with the specified format
 *
 * default value: DD/MM/YYYY
 */
export const generateDateFormat = (format?: string): number => {
  // return dayjs().format(format || 'DD/MM/YYYY');
  return dayjs().unix();
};

/**
 * Filter out past events
 */
export const isPastEvent = (timestamp: number): boolean => {
  const today = dayjs();
  return today.diff(timestamp, 'millisecond') > 0;
};
