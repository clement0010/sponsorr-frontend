import dayjs from 'dayjs';

// Converts ES6 Date object to DD/MM/YYYY format
const dateFormat = (date: Date): string => dayjs(date).format('DD/MM/YYYY');

export default dateFormat;
