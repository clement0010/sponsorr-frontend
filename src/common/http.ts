import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT
    ? process.env.VUE_APP_API_ENDPOINT
    : 'http://localhost:3000/todo',
  timeout: 3000,
});

export default client;
