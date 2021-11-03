import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: true,
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Credentials': 'true',
  // },
});

export default apiClient;
