import dayjs from 'dayjs';

/**
 * Generate date with the specified format
 *
 * default value: DD/MM/YYYY
 */
export const generateDateFormat = (format?: string): string => {
  return dayjs().format(format || 'DD/MM/YYYY');
};

export const generateCurrentUnixTime = (): number => {
  return dayjs().unix();
};

export const generateUnixTimeFromDate = (date: string): number => {
  return dayjs(date).unix();
};

export const generateDateFromUnixTime = (unixTime: number): string => {
  return dayjs.unix(unixTime).format('DD/MM/YYYY');
};

/**
 * Filter out past events
 */
export const isPastEvent = (timestamp: number): boolean => {
  const today = generateCurrentUnixTime();
  return today - timestamp > 0;
};
