import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * Generates date as string, with option to pass date as ISO8601, unix timestamp, and format
 *
 * @param dateOrUnixTime the supplied date (eg IS08601, YYYY-MM-DD) as string or unix time
 * @param format the user specified format. Default is DD/MM/YYYY
 * @returns the date with the specified format according to the arguments, or todays date in DD/MM/YYYY if no arguments supplied.
 */
export const generateDate = (dateOrUnixTime?: string | number, format?: string): string => {
  const formatter: string = format || 'DD/MM/YYYY';

  if (!dateOrUnixTime) {
    // Return today's date
    return dayjs().format(formatter);
  }

  if (typeof dateOrUnixTime === 'number') {
    return dayjs.unix(dateOrUnixTime).format(formatter);
  }

  return dayjs(dateOrUnixTime).format(formatter);
};

/**
 * Generate a unix timestamp, with option to pass date as string
 *
 * @param date the supplied date in acceptable format
 * @returns the date in unix time, or current unix time if no date supplied.
 */
export const generateUnixTime = (date?: string): number => {
  if (!date) {
    return dayjs().unix();
  }

  return dayjs(date).unix();
};

/**
 * Generate range of dates given array of unix timestamps
 */
export const generateDateRangeFromUnixTimeRange = (unixTimeRange: number[]): string => {
  return unixTimeRange.map((unixTime) => generateDate(unixTime)).join(' - ');
};

/**
 * Filter out past events
 */
export const isPastEvent = (timestamp: number): boolean => {
  const today = generateUnixTime();
  return today - timestamp > 0;
};

export const parseTime = (time: string): string => {
  if (!time) {
    return '';
  }
  return dayjs(time, 'HH:mm').format('hh:mm A');
};
