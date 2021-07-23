export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://asia-southeast2-sponsorr-dev.cloudfunctions.net/'
    : 'https://asia-southeast2-sponsorr-prod.cloudfunctions.net/';

export const CONFIRMATION_ENDPOINT = '/confirmation';
