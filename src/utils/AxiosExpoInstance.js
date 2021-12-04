import axios from 'axios';

export const AxiosExpoInstance = axios.create({
  baseURL: `https://exp.host/--/api/v2/`,

  headers: {
    Accept: 'application/json',
    'Accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
  },
});
