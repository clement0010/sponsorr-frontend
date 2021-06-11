import dayjs from 'dayjs';

/**
 * Generate today's date with the specified format
 *
 * default value: DD/MM/YYYY
 */
export const generateTodayDateFormat = (format?: string): string => {
  return dayjs().format(format || 'DD/MM/YYYY');
};

/**
 * Generate current unix timestamp
 */
export const generateCurrentUnixTime = (): number => {
  return dayjs().unix();
};

/**
 * Generate unix timestamp with given date
 */
export const generateUnixTimeFromDate = (date: string): number => {
  return dayjs(date).unix();
};

/**
 * Generate date with specified format given unix timestamp
 */
export const generateDateFromUnixTime = (unixTime: number): string => {
  return dayjs.unix(unixTime).format('DD/MM/YYYY');
};

/**
 * Generate range of dates given array of unix timestamps
 */
export const generateDateRangeFromUnixTimeRange = (unixTimeRange: number[]): string => {
  return unixTimeRange.map((unixTime) => generateDateFromUnixTime(unixTime)).join(' - ');
};

/**
 * Filter out past events
 */
export const isPastEvent = (timestamp: number): boolean => {
  const today = generateCurrentUnixTime();
  return today - timestamp > 0;
};
