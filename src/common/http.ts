import axios from 'axios';

import { BASE_URL, CONFIRMATION_ENDPOINT } from './config';
import { WebhookQueryStringParams } from './type';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const sendConfirmation = async (
  emailAddress: string,
  id: string,
  hash: string,
): Promise<number> => {
  const queryStringParams: WebhookQueryStringParams = {
    emailAddress,
    id,
    hash,
  };
  try {
    const response = await client.post(CONFIRMATION_ENDPOINT, JSON.stringify(queryStringParams));
    return response.status;
  } catch (error) {
    console.error(error);
    throw new Error(error.response.status);
  }
};

export default client;
